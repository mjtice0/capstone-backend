const router = require("express").Router();
const Review = require("../models/Review");

//create a review, the title, descrption,etc. will be in request body
router.post("/", async (req,res)=>{
  const newReview = new Review(req.body);
  try {
    const savedReview = await newReview.save();
    res.status(200).json(savedReview);
  } catch(err){
    res.status(500).json(err);
  }
});
//get all pins from DB
router.get("/", async (req,res)=>{
  try{
    const review = await Review.find();
    res.status(200).json(reviews)

  }catch(err){
    res.status(500).json(err)
  }
})

module.exports = router