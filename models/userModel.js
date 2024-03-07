const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
    minlength: [3, 'name should be alteast 3 character'],
    maxlength: [40, 'name should be less then or equal 40 character'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  email: {
    type: String,
    required: [true, 'Plase provide your email'],
    unique: [true, 'This email already in our database'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email id'],
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlength: [8, 'Password must be alteast 8 character long'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide tour confirm password'],
    minlength: [8, 'Password must be alteast 8 character long'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'confirm password must be same as password',
    },
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'guide', 'lead-guide'],
      message: 'role only either user or guide or lead-guide',
    },
    default: 'user',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
