const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

// const asyncError = async function () {
//   try {
//   } catch (err) {}
// };

exports.getAlltours = async (req, res, next) => {
  try {
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
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: 'something went wrong !',
    });
  }
};

exports.getTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      ok: true,
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'something went wrong !',
    });
  }
};

exports.createTour = async (req, res, next) => {
  try {
    const tour = await Tour.create(req.body);

    res.status(201).json({
      ok: true,
      data: {
        tour,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: 'something went wrong !',
    });
  }
};

exports.updateTour = async (req, res, next) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      data: {
        tour,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: 'something went wrong !',
    });
  }
};

exports.deleteTour = async (req, res, next) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      ok: true,
      message: 'tour delete',
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'something went wrong !',
    });
  }
};

// AGGRIGATION

// 1) Get Tours by catagory
exports.toursByCategory = async (req, res, next) => {
  try {
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
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
    });
  }
};
