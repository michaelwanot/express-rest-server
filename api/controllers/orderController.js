const mongoose = require('mongoose');

const Order = require('../models/order.model');
const Product = require('../models/product.model');

exports.get_all_orders = (req, res, next) => {
  Order.find()
    .select('_id product')
    .exec()
    .then(result => {
      const response = {
        orders: result.map(item => {
          return {
            item,
            metadata: {
              URL: `http://localhost:${process.env.PORT}/orders/${item._id}`
            }
          }
        }),
        quantity: result.length,
      }
      res.status(200).json({ message: 'handling get request for all orders', response });
    })
    .catch();
};

exports.insert_order = (req, res, next) => {
  const idProduct = req.body.product;
  Product.findOne({ _id: idProduct })
    .exec()
    .then(result => {
      if(result) {
        const order = new Order({
          _id: mongoose.Types.ObjectId(),
          product: req.body.product,
          quantity: req.body.quantity
        });
        order.save()
          .then((result) => {
            res.status(200).json({ message: 'Order Created!', result});
          })
          .catch(err => res.status(500).json(err));
      } else {
        res.status(404).json({ message: 'Product does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

exports.get_order_detail = (req, res, next) => {
  const id = req.params.orderId;
  Order.findOne({ _id: id })
    .exec()
    .then(result => res.status(200).json({ message: 'handling get specific order', result }))
    .catch(err => res.status(500).json(err));
};

exports.update_order = (req, res, next) => {
  const id = req.params.orderId;
  const newOrder = {};
  for(opt of req.body) {
    newOrder[opt.propName] = opt.value;
  }
  Order.update({ _id: id, $set: newOrder })
    .exec()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json(err));
};

exports.delete_order = (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({ message: 'handling delete specific order', id });
}