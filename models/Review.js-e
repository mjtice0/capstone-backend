const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema(
  {
    placeId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
      min: 3,
    },
    description: {
      type: String,
      require: true,
      min: 3,
    },
    rating: {
      type: Number,
      require: true,
      min: 0,
      max: 5,
    },
    features: 
    {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
