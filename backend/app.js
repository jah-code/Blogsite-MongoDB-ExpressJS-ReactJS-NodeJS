const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const blogsRoutes = require("./routes/blogs-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/blogs", blogsRoutes);

app.use((req, res, next) => {
  throw new HttpError("Could not find this route", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

mongoose
  .connect(
    "mongodb+srv://lijah:yXPh9WRxQFllb5vk@cluster0.cdvaodk.mongodb.net/blogs"
  )
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
