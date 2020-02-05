/* eslint-disable no-console */
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const middlewares = require("./routes/middlewares");

//connect mongodb
mongoose.connect(
  "mongodb://firdaus:firdaus246@198.71.61.98:27017/Users?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("connected to Mongo database"));

//middlewares

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(middlewares.checkTokenSetUser);
app.use("/static", express.static(path.join(__dirname, "static")));

//import routes
const authRoute = require("./routes/auth");
const admin = require("./routes/admin");
const subjects = require("./subjects/subjects");

//Route middlewares
app.use("/users", authRoute);
app.use("/adminusers", middlewares.isLoggedIn, middlewares.isAdmin, admin);
app.use("/subjects", middlewares.isLoggedIn, subjects);

//Handle production
if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use(express.static(__dirname + "/public/"));

  // Handle Single Page Application
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

app.use(express.static(__dirname + "/public/"));

// Handle Single Page Application
app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));

const port = process.env.PORT || 5000;

app.listen(port, err => {
  if (err) return console.log(err);
  console.log("server running on port " + port);
});
