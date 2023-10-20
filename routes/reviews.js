const router = require("express").Router();
const Review = require("../models/Review");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Access denied. Please log in." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token Payload:", decoded);
    req.user = decoded;
    console.log("Token Verified:", decoded);
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

router.post("/:placeId", verifyToken, async (req, res) => {
  const { placeId } = req.params;
  const { name, title, description, rating, features } = req.body;
  const { userId } = req.user;

  console.log("will save", {
    placeId,
    userId,
    name,
    title,
    description,
    rating,
    features,
  });
  const review = new Review({
    placeId,
    userId,
    name,
    title,
    description,
    rating,
    features,
  });

  try {
    const savedReview = await review.save();
    res.status(200).json(savedReview);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
//get all reviews associated with a place Id from DB
router.get("/:placeId", async (req, res) => {
  try {
    const reviews = await Review.find({ placeId: req.params.placeId });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
