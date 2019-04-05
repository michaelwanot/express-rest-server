const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.register_user = (req, res, next) => {
  User.find({ email: req.body.email }) // search for the existing signed email
    .exec()
    .then(result => {
      if(result.length === 0) { // if not exists
        bcrypt.hash(req.body.password, 10, (err, hash) => { // crypt the received password
          if(err) {
            return res.status(409).json({ error: err }); // if there are error
          } else { // create a new User
            user = new User({
              _id: mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash, // hashed password
              phone: req.body.phone,
            });
            user.save()
              .then((result) => res.status(201).json(result)) // User saved to DB
              .catch((err) => res.status(500).json({ error: err.message })); // Error from validation
          }
        });
      } else {
        res.status(500).json({ message: 'User is signedUp yet' }); // User exists
      }
    })
    .catch(err => res.status(500).json({ error: err }));
};

exports.delete_user = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .then(result => res.status(200).json({ message: 'user deleted' , result}))
    .catch(err => res.status(500).json({ error: err }));
};

exports.user_login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if(user) {
        bcrypt.compare(req.body.password, user.password, (err, resp) => {
          if(err) {
            return res.status(401).json({ message: 'Auth failed' })
          }
          if(resp) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id
              },
              process.env.JWT_KEY,
              {
                expiresIn: '1h'
              }
            );
            return res.status(200).json({ message: 'Auth success!', token: token });
          }
          return res.status(401).json({ message: 'Auth failed' });
        });
      } else {
        return res.status(404).json({ message: 'Auth failed' })
      }
    })
    .catch(err => res.status(500).json({ error: err }));
};