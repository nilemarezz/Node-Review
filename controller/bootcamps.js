// @desc    Get All Bootcamps
// @route   GET /api/v1/bootcamps/
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ msg: "Get all Bootcamps" });
};

// @desc    Get single Bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ msg: `Get ${req.params.id} detail Bootcamps` });
};

// @desc    Create Bootcamp
// @route   POST /api/v1/bootcamps/
// @access  Private
exports.createBootcamps = (req, res, next) => {
  res.status(200).json({ msg: `Create Bootcamps` });
};

// @desc    Update Single Bootcamps
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamps = (req, res, next) => {
  res.status(200).json({ msg: `Update ${req.params.id} Bootcamps` });
};

// @desc    Delete All Bootcamps
// @route   DELETE /api/v1/bootcamps/
// @access  Private
exports.deleteBootcamps = (req, res, next) => {
  res.status(200).json({ msg: `Delete ${req.params.id} Bootcamps` });
};
