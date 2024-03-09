const User = require('./../models/userModel');
const catchError = require('./../utils/catchError');
const AppError = require('./../utils/appError');
const jwt = require('jsonwebtoken');

const singToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

exports.singup = catchError(async (req, res, next) => {
  // get the request body
  if (req.body.role === 'admin') req.body.role = 'user';
  //hasing the password

  //create account
  const newUser = await User.create(req.body);
  // not expose the hashed password to the clint
  newUser.password = undefined;

  // sending welcome email

  // send jwt via cookie

  const jwtToken = await singToken(newUser._id);

  res.status(201).json({
    ok: true,
    token: jwtToken,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchError(async (req, res, next) => {
  // get the email and password form the req.body
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError('Please prvide your email and password', 400));

  // find user using email
  const user = await User.findOne({ email }).select('+password');

  // validate password

  if (!user || !(await user.checkIsCorrectPassword(password)))
    return next(new AppError('Either email or password is wrong!', 404));

  const jwtToken = await singToken(user._id);
  // loggedin user

  res.status(200).json({
    ok: true,
    token: jwtToken,
  });
});

exports.protect = (req, res, next) => {
  // get jwt token
  // get id form the payload
  // validate jwt
  // GRANT ACCESS TO THE PROTESTED ROUT
};
