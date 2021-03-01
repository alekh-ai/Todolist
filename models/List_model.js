const mongoose = require('mongoose');
const { itemSchema } = require('./Item_model');

// const itemSchema = mongoose.Schema({
// 	itemName: String,
// });

const listSchema = mongoose.Schema({
	listName: String,
	listItems: [itemSchema],
});

const List = mongoose.model('List', listSchema);

module.exports = List;
