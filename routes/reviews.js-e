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
// findByIdAndDelete(req.params.id);
//delete a review associated with a place Id from DB
router.delete("/:placeId", async (req, res) => {
  try {
    const review = await Review.find({ placeId: req.params.placeId });
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.statues(200).json({
      success: true,
      message: "The review was deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete the review",
      error: err,
    });
  }
});

module.exports = router;
