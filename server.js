const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bootcampsRouter = require("./router/bootcamps");
const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });

connectDB();
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/bootcamps", bootcampsRouter);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
