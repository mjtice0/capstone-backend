const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Log received username and password
    console.log("Received username:", username);
    console.log("Received password:", password);

    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "User not found" });
    }

    // Log stored password
    console.log("Stored password:", user.password);

    if (password !== user.password) {
      console.log("Incorrect password");
      return res.status(400).json({ error: "Incorrect password" });
    }

    console.log("Login successful");

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Generated token:", token);

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
