const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bootcampsRouter = require("./router/bootcamps");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/ErrorHandler");
dotenv.config({ path: "./config/config.env" });
const app = express();
connectDB();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/bootcamps", bootcampsRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
