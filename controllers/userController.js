const User = require('./../models/userModel');
const catchError = require('./../utils/catchError');
const AppError = require('./../utils/appError');

exports.getAllUsers = catchError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    ok: true,
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError('There is no user with this id', 404));

  res.status(200).json({
    ok: true,
    data: {
      user,
    },
  });
});

// DO NOT USE THIS FUNTION TO UPDATE USER-PASSWORD
exports.updateUser = catchError(async (req, res, next) => {
  if (req.body.password) return next(new AppError('Do not use this to chage password', 400));

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!user) return next(new AppError('There is no user with this id', 404));

  res.status(200).json({
    ok: true,
    data: {
      user,
    },
  });
});

exports.deleteUser = catchError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return next(new AppError('There is no user with this id', 404));

  res.status(200).json({
    ok: true,
    message: 'user deleted',
  });
});
