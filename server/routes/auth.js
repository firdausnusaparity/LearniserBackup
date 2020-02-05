const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const {
  registerValidation,
  loginValidation,
  updateValidation
} = require("./validation");

router.post("/signup", async (req, res) => {
  //validate the user input
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if the email already in database
  const emailExist = await User.findOne({
    email: req.body.email
  });
  if (emailExist) return res.status(400).send("Email already exist");

  //hash the password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create new user
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
    birthdate: req.body.birthdate,
    gender: req.body.gender,
    role: "user"
  });
  try {
    const savedUser = await user.save();
    //console.log(savedUser);
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/currentusers", (req, res) => {
  res.json({
    message: "User from token",
    user: req.user
  });
});

router.post("/login", async (req, res) => {
  //validate the user login and check if admin
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if the email already in database
  const user = await User.findOne({
    email: req.body.email,
    role: "user"
  });
  if (!user) return res.status(400).send("Email is Wrong");

  //check the password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Password");

  //create and assign token
  const token = jwt.sign({ _id: user._id, role: user.role }, "pidonusa", {
    expiresIn: "1d"
  });
  res.status(200).json({
    message: "Successfully loggedin",
    token: token
  });
});

router.post("/update", (req, res) => {
  //validate the user update
  const { error } = updateValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //select the current user _id
  if (mongoose.Types.ObjectId.isValid(req.user._id)) {
    User.findByIdAndUpdate(
      req.user._id,
      {
        country: req.body.country,
        state: req.body.state,
        district: req.body.district,
        school: req.body.school,
        form: req.body.form
      },
      { new: true },
      (err, user) => {
        if (err) return res.status(500).send(err);
        return res.send(user);
      }
    );
  } else {
    console.log("Incorrect Id or Not Logged In");
  }
});

//admin login
router.post("/adminlogin", async (req, res) => {
  //validate the user login and check if admin
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if the email already in database
  const user = await User.findOne({
    email: req.body.email,
    role: "admin"
  });
  if (!user) return res.status(400).send("Email is Wrong");

  //check the password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Password");

  //create and assign token
  const token = jwt.sign({ _id: user._id, role: user.role }, "pidonusa", {
    expiresIn: "1d"
  });
  res.status(200).json({
    message: "Successfully loggedin",
    token: token
  });
});

module.exports = router;
