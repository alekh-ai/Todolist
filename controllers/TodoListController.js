const _ = require('lodash');
const List = require('../models/List_model');
const { Item } = require('../models/Item_model');

const TodoListController = () => {};

//////////////////////////////////////////////////////////////

// -------------------	Render Today List
TodoListController.getToday = (req, res) => {
	List.findOne({ listName: 'Today' }, (err, foundList) => {
		if (!err) {
			if (!foundList) {
				// When file doesn't exists
				const list = new List({
					listName: 'Today',
					listItem: [],
				});

				list
					.save()
					.then(() => res.redirect('/'))
					.catch((err) => console.log(err));
			} else {
				// Render List if already exist
				res.render('list', {
					listTitle: foundList.listName,
					newListItem: foundList.listItems,
				});
			}
		} else {
			// When logs error from List.findOne()
			console.log(err);
		}
	});
};

//////////////////////////////////////////////////////////////////

// -------------------	Render Single List

TodoListController.getList = (req, res) => {
	// Use lodash to only capitalize first letter of a listName
	const customListName = _.capitalize(req.params.customListName);

	List.findOne({ listName: customListName }, (err, foundList) => {
		if (!err) {
			if (!foundList) {
				// Create a list document if List doesn't exist
				const list = new List({
					listName: customListName,
					listItems: [],
				});
				list
					.save()
					.then(() => res.redirect('/' + customListName)) // make sure it redirect after save
					.catch(() => console.log(err)); // better catch errors
			} else {
				// Render List if already exist
				res.render('list', {
					listTitle: foundList.listName,
					newListItem: foundList.listItems,
				});
			}
		} else {
			console.log(err);
		}
	});
};

// -------------------	Render all Lists

TodoListController.getListAll = (req, res) => {
	List.find((err, foundLists) => {
		if (!err) {
			// Render lists of foundLists
			res.render('lists', {
				listNames: foundLists,
				listTitle: 'Lists',
			});
		} else {
			// Log errors
			console.log(err);
		}
	});
};

//////////////////////////////////////////////////////////////

// -------------------	Item

TodoListController.addItem = (req, res) => {
	// Get list info
	const itemName = req.body.newItem;
	const listName = req.body.list;

	// Make a new list item from itemSchema
	const item = new Item({
		itemName: itemName,
	});

	// Make a item push to the list's items array
	List.findOne({ listName: listName }, (err, foundList) => {
		foundList.listItems.push(item);
		foundList
			.save()
			.then(() => res.redirect('/' + listName))
			.catch((err) => console.log(err));
	});
};

TodoListController.removeItemById = (req, res) => {
	const checkedItemId = req.body.checked;
	const listName = req.body.listName;

	List.findOneAndUpdate(
		{ listName: listName },
		{ $pull: { listItems: { _id: checkedItemId } } },
		(err, foundList) => {
			if (!err) {
				res.redirect('/' + listName);
			} else {
				console.log(err);
			}
		}
	);
};

//////////////////////////////////////////////////////////////

// -------------------	List

TodoListController.addList = (req, res) => {
	// Get list info
	const listName = _.capitalize(req.body.newList);

	List.findOne({ listName: listName }, (err, foundList) => {
		if (!err) {
			if (!foundList) {
				// When file doesn't exists
				const list = new List({
					listName: listName,
					listItem: [],
				});

				list
					.save()
					.then(() => res.redirect('/' + listName))
					.catch((err) => console.log(err));
			} else {
				// Render List if already exist
				res.redirect('/' + listName);
			}
		} else {
			// When logs error from List.findOne()
			console.log(err);
		}
	});
};

TodoListController.removeListById = (req, res) => {
	const deleteListId = req.body.deleteList;

	List.findByIdAndRemove(deleteListId, (err) => {
		if (!err) {
			console.log('List is Removed! ', deleteListId);
			res.redirect('/lists');
		}
	});
};

module.exports = TodoListController;
