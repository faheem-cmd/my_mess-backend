const express = require("express");
var mongoose = require("mongoose");
var app = express();
const router = require("./routes/user.router");
app.use("/", router);
//MongoDB connection
mongoose.connect("mongodb://localhost/mess", { useNewUrlParser: true });
mongoose.connection
  .once("open", function () {
    console.log("Database connected Successfully");
  })
  .on("error", function (err) {
    console.log("Error", err);
  });
//Server
app.listen(8000, function () {
  console.log("Server is Up");
});
