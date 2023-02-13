const router = require("express").Router();
const Review = require("../models/Review");

//create a review, the title, descrption,etc. will be in request body
router.post("/:placeId", async (req,res)=>{
  const newReview = new Review(req.body);
  try {
    const savedReview = await newReview.save();
    res.status(200).json(savedReview);
  } catch(err){
    res.status(500).json(err);
  }
});
//get all reviews from DB
router.get("/:placeId", async (req,res)=>{
  try {
    const review = await Review.find({ placeId: req.params.placeId });
    res.status(200).json(review)
  } catch(err){
    res.status(500).json(err)
  }
  // res.status(200).json('hello')
})

module.exports = router