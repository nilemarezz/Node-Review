const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bootcampsRouter = require("./router/bootcamps");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/ErrorHandler");
const nodemailer = require("nodemailer");
dotenv.config({ path: "./config/config.env" });
const app = express();
connectDB();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/sendmail", async (req, res) => {
  try {
   
    // https://myaccount.google.com/lesssecureapps to open secure
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "pcmprojectz@gmail.com",
        pass: process.env.EMAIL_PASS
      }
    });
    let info = await transporter.sendMail({
      from: '"[Request Borrow]" <pcmprojectz@gmail.com>', // sender address
      to: "nilenon@gmail.com", // list of receivers
      subject: "Borrow Item request on student", // Subject line
      html: "<b>Hello world</b>" // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.log(err);
  }
});
app.use("/api/v1/bootcamps", bootcampsRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
