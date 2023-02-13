const router = require("express").Router();
const Review = require("../models/Review");

//create a review, the title, descrption,etc. will be in request body
router.post("/:placeId", async (req, res) => {
  const { placeId } = req.params;
  const { name, title, description, rating, features } = req.body;

  const newReview = {
    placeId,
    name,
    title,
    description,
    rating,
    features,
  };

  try {
    const savedReview = await newReview.save();
    res.status(200);
  } catch (err) {
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
