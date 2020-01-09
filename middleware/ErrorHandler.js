const ErrorResponse = require("../utils/ErrorResponse");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  console.log(err);
  // ไม่มี Id ใน database
  if (err.name === "CastError") {
    const message = `Bootcamp with id ${err.value} not found`;
    error = new ErrorResponse(message, 404);
  }
  // ข้อมูลซ้ำ
  if (err.code === 11000) {
    const message = `Duplicate field Enter`;
    error = new ErrorResponse(message, 404);
  }
  // ไม่ส่งข้อมูลมา
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 404);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, err: error.message || "Server Error" });
};

module.exports = errorHandler;
