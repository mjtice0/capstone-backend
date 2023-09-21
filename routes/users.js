const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Registration route
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password, // Store the plaintext password (not recommended in production)
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Log received username and password
    console.log("Received username:", username);
    console.log("Received password:", password);

    const user = await User.findOne({ username });

    if (!user) {
      // Log user not found
      console.log("User not found");
      return res.status(400).json({ error: "User not found" });
    }

    // Log stored password
    console.log("Stored password:", user.password);

    // For debugging, compare the received password with the stored password directly
    if (password !== user.password) {
      // Log incorrect password
      console.log("Incorrect password");
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Log successful login
    console.log("Login successful");

    // Create and sign a JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Log the generated token
    console.log("Generated token:", token);

    // Send the token as a response
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

// const router = require("express").Router();
// const User = require("../models/User");

// // Registration route
// router.post("/register", async (req, res) => {
//   try {
//     // Create a new user without hashing the password
//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password, // Store the plaintext password (not recommended in production)
//     });

//     // Save user and send the response
//     const user = await newUser.save();
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Login route
// router.post("/login", async (req, res) => {
//   try {
//     // Find user by username
//     const user = await User.findOne({ username: req.body.username });
//     console.log("Retrieved user:", user);
//     console.log("Received password:", req.body.password);
//     console.log("Stored password:", user.password);

//     // Check if user exists
//     if (!user) {
//       return res.status(400).json("User not found");
//     }

//     // Validate the password (plaintext comparison - not recommended in production)
//     if (req.body.password !== user.password) {
//       return res.status(400).json("Incorrect password");
//     }

//     // Send response
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;

// const router = require("express").Router();
// const User = require("../models/User");
// const bcrypt = require("bcrypt");

//create a pin, the title, descrption will be in request body
// router.post("/register", async (req, res) => {
//   try {
//     //generate a new password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     //create a new user
//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPassword,
//     });

//     //save user and send the response
//     const user = await newUser.save();
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //login for users
// router.post("/login", async (req, res) => {
//   try {
//     //find user
//     const user = await User.findOne({ username: req.body.username });
//     !user && res.status(400).json("wrong username or password");

//     //if correct than validate the password
//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     !validPassword && res.status(400).json("wrong username or password!");

//     //send response
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
