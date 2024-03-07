const User = require('./../models/userModel');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      ok: true,
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
    });
  }
};
