var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");

/* ENV Variables */
require("dotenv").config();

var checkUser = require("./middleware/check-user");
var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login-router");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// https://stackoverflow.com/questions/36824106/express-doesnt-set-a-cookie
// Accessed July 13, 2021
app.use(cors({origin: true, credentials: true}));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// perpetuating user
// app.use(checkUser);
app.use("/", indexRouter);
app.use("/login-router", loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

console.log("12345 should be here: " + process.env.MONGO_PASSWORD);
// let secret = require('crypto').randomBytes(64).toString('hex');
// console.log(secret);

/* Connect to Mongo Atlas */
/* CITATION: https://dev.to/dalalrohit/how-to-connect-to-mongodb-atlas-using-node-js-k9i */
const url = `mongodb+srv://m001-student:${process.env.MONGO_PASSWORD}@sandbox.vsrq0.mongodb.net/vanhouse?retryWrites=true&w=majority`;
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to Mongo Atlas!");
  })
  .catch((err) => {
    console.log("Failed to connect to Mongo Atlas. ", err);
  });

module.exports = app;
