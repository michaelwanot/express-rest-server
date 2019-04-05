const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    match: [/^A-Za-z/],
    maxLength: 15,
  },
  email: {
    type: String,
    required: [true, 'Email field is required'],
    unique: true,
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'WTF'],
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    validate: {
      validator: (phone) => /\d{10}/.test(phone),
      message: props => `${props.value} is not a valid number`,
    },
  }
});

module.exports = mongoose.model('User', UserSchema);