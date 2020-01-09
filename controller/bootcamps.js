const Bootcamps = require("../model/Bootcamps");

// @desc    Get All Bootcamps
// @route   GET /api/v1/bootcamps/
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  let query = req.query;
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  query = Bootcamps.find(JSON.parse(queryStr));

  try {
    const bootcamps = await query;
    res.status(200).json({ success: true, data: bootcamps });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single Bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamps.findById(req.params.id);
    if (!bootcamp) {
      next(err);
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// @desc    Create Bootcamp
// @route   POST /api/v1/bootcamps/
// @access  Private
exports.createBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamps.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// @desc    Update Single Bootcamps
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamps.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!bootcamp) {
      next(err);
    }
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete All Bootcamps
// @route   DELETE /api/v1/bootcamps/
// @access  Private
exports.deleteBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamps.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      next(err);
    }
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};
