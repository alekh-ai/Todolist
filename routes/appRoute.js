const express = require('express');
const router = express.Router();

// const ItemController = require('../controllers/ItemController');
const TodoListController = require('../controllers/TodoListController');

// -------------- Get all current List Items
router.get('/', TodoListController.getToday);

// -------------- Get all List you've created
router.get('/lists', TodoListController.getListAll);

// -------------- Get or create a custom list
router.get('/:customListName', TodoListController.getList);

// -------------- Create a new Item in Today
router.post('/', TodoListController.addItem);

// -------------- Create a new List
router.post('/create', TodoListController.addList);

// -------------- Delete a Item
router.post('/delete', TodoListController.removeItemById);

// -------------- Delete a List
router.post('/deleteList', TodoListController.removeListById);

// -------------- Create a new Item  in Any-List
router.post('/:customListName', TodoListController.addItem);

module.exports = router;
