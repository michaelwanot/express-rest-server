const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // special type to define an id in mongoDB when an object is saved
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  updateDate: {
    type: Date,
  },
  productImage: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Product', ProductSchema);