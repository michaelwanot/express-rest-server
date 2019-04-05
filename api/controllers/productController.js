const mongoose = require('mongoose');

const Product = require('../models/product.model'); // import mongoose model

exports.get_all_products = (req, res, next) => {
  Product.find()
    .select('name price _id creationDate productImage')
    .exec()
    .then(result => {
      if(result.length) {
        const response = {
          count: result.length,
          products: result.map((item) => {
            const { name, price, creationDate, productImage } = item;
            return {
              name,
              price,
              creationDate,
              productImage,
              metadata: {
                URL: `http://localhost:${process.env.PORT}/products/${item._id}`,
                method: 'GET'
              }
            };
          })
        };
        res.status(200).json({ message: 'Showing all products', response });
      } else {
        res.status(200).json({ message: 'there are no products available', result });
      }
    })
    .catch(error => res.status(500).json({ error}));
};

exports.insert_product = (req, res, next) => {
  // istance of Product model to operate on a database
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    creationDate: Date.now(),
    productImage: req.file.path,
  });
  product.save() // save(Create a record on DB)
    .then(result => { // success
      res.status(200).json({ message: 'Created product', product });
    })
    .catch(err => res.status(500).json(err)); // catch errors
};

exports.get_product_detail = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id) // search(Search a record by [id])
    .select('_id creationDate name price')
    .exec()
    .then(result => { // success of the query
      if(result) { // if exists
        console.log(`Succesfully found product with id: ${id}`);
        const { name, price, _id, creationDate } = result;
        const response = {
          name,
          price,
          _id,
          creationDate,
          metadata: {
            URL: `http://localhost:${process.env.PORT}/products`,
            method: 'GET'
          }
        };
        res.status(200).json(response);
      } else { // if no exists(notFound)
        res.status(404).json({ message: 'product not found!' });
      }
    })
    .catch(err => res.status(500).json({ error: err })); // catch errors
};

exports.update_product = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {
    updateDate: Date.now()
  };
  for(const opt of req.body) {
    updateOps[opt.propName] = opt.value;
  }
  Product.update({ _id: id }, { $set: updateOps})
    .exec()
    .then(result => {
      const response = {
        ...result,
        metadata: {
          URL: `http://localhost:${process.env.PORT}/products/`,
        }
      };
      res.status(201).json({ message: 'Product updated!', response })
    })
    .catch(err => res.status(500).json({error: err}));
};

exports.delete_product = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => res.status(500).json({ error: err }));
};