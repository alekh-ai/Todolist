const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
	itemName: String,
});

const Item = mongoose.model('Item', itemSchema);

// Exports all
module.exports = { Item, itemSchema };
