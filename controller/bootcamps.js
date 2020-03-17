const Bootcamps = require("../model/Bootcamps");

// @desc    Get All Bootcamps
// @route   GET /api/v1/bootcamps/
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  let query = req.query;
  const reqQuery = { ...req.query };
  const removeField = ["select", "sort"];
  removeField.forEach(param => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  query = Bootcamps.find(JSON.parse(queryStr));

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    console.log(fields);
    query = query.select(fields);
  }
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

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
