const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
    trim: true,
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
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide tour confirm password'],
    minlength: [8, 'Password must be alteast 8 character long'],
    validate: {
      // THIS ONLY ON SAVE/CREATE

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
  active: {
    type: Boolean,
    default: true,
  },
});

// PRE SAVE- MIDDLEWARE

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

// INSTANCE METHOD

userSchema.methods.checkIsCorrectPassword = async function (inpPassword) {
  return await bcrypt.compare(inpPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
