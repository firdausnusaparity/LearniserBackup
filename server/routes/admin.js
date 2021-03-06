const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { adminupdateadmin } = require("./validation");

router.get("/allusers", async (req, res, next) => {
  try {
    const result = await User.find({}, "-password");
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/updateuser/:id", async (req, res, next) => {
  const { id: _id } = req.params;
  // validate id params
  try {
    // validate req body
    const result = adminupdateuser(req.body);
    if (!result.error) {
      // if valid: find user in db with given id
      const query = { _id };
      const user = await User.findOne(query);
      if (user) {
        // update user in db
        const updatedUser = req.body;
        if (updatedUser.password) {
          const salt = await bcrypt.genSalt(12);
          updatedUser.password = await bcrypt.hash(updatedUser.password, salt);
        }
        const result = await User.findOneAndUpdate(query, updatedUser, {
          new: true
        });
        // respond with user
        delete result.password;
        res.json(result);
      } else {
        // if not exists - send 404 (with user not found)
        res.status(404).send("Id is not valid");
      }
    } else {
      // if not valid - send an error with the reason
      res.status(422);
      throw new Error(result.error);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/updateadmin", async (req, res, next) => {
  //check if the email already in database
  const user = await User.findById({
    _id: req.user._id
  });
  if (!user) return res.status(400).send("Cannot find your Id");

  //check the password
  const validPass = await bcrypt.compare(req.body.Old, user.password);
  if (!validPass)
    return res.status(400).send("Invalid Old Password, Please Try Again");

  // validate id params
  try {
    // validate req body
    const result = adminupdateadmin(req.body);
    if (!result.error) {
      // if valid: find user in db with given id
      const query = req.user._id;
      const user = await User.findById(query);
      if (user) {
        // update user in db
        const updatedUser = req.body;
        if (updatedUser.New) {
          const salt = await bcrypt.genSalt(12);
          updatedUser.password = await bcrypt.hash(updatedUser.New, salt);
        }
        const result = await User.findOneAndUpdate(
          query,
          { password: updatedUser.password },
          {
            new: true
          }
        );
        // respond with user
        delete result.password;
        res.json(result);
      } else {
        // if not exists - send 404 (with user not found)
        res.status(404).send("Id is not valid");
      }
    } else {
      // if not valid - send an error with the reason
      res.status(422);
      throw new Error(result.error);
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
