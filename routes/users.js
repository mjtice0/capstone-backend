const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//create a pin, the title, descrption will be in request body
router.post("/register", async (req, res) => {
  try {
    //generate a new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and send the response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login for users
router.post("/login", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("wrong username or password");

    //if correct than validate the password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong username or password!");

    //send response
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("", async (req, res) => {
//   res.status(200).json("hi");
// });
module.exports = router;
