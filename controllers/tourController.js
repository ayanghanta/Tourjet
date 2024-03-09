const Tour = require('./../models/tourModel');

const APIFeatures = require('./../utils/apiFeatures');
const catchError = require('./../utils/catchError');
const AppError = require('./../utils/appError');

exports.getAlltours = catchError(async (req, res, next) => {
  const apiFeature = new APIFeatures(req.query, Tour.find())
    .filtering()
    .sorting()
    .limiting()
    .paginate();

  const allTours = await apiFeature.query;
  return res.status(200).json({
    ok: true,
    results: allTours.length,
    data: {
      tours: allTours,
    },
  });
});

exports.getTour = catchError(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) return next(new AppError('Tour with this id is not found', 404));

  res.status(200).json({
    ok: true,
    data: {
      tour,
    },
  });
});

exports.createTour = catchError(async (req, res, next) => {
  const tour = await Tour.create(req.body);

  res.status(201).json({
    ok: true,
    data: {
      tour,
    },
  });
});

exports.updateTour = catchError(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!tour) return next(new AppError('There is no tour with that id', 404));

  res.status(200).json({
    ok: true,
    data: {
      tour,
    },
  });
});

exports.deleteTour = catchError(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) return next(new AppError('There is no tour with that id', 404));

  res.status(204).json({
    ok: true,
    message: 'tour delete',
  });
});

// AGGRIGATION

// 1) Get Tours by catagory
exports.toursByCategory = catchError(async (req, res, next) => {
  const tours = await Tour.aggregate([
    {
      $unwind: '$category',
    },
    {
      $match: { category: req.params.category },
    },
  ]);

  res.status(200).json({
    ok: true,
    results: tours.length,
    data: {
      tours,
    },
  });
});
