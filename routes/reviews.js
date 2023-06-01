const router = require("express").Router();
const Review = require("../models/Review");

//create a new review in DB
router.post("/:placeId", async (req, res) => {
  const { placeId } = req.params;
  const { name, title, description, rating, features } = req.body;
  console.log("will save", {
    placeId,
    name,
    title,
    description,
    rating,
    features,
  });
  const review = new Review({
    placeId,
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

//delete a review associated with a place Id from DB

module.exports = router;
