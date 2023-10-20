const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema(
  {
    placeId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 3,
    },
    description: {
      type: String,
      required: true,
      min: 3,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    features: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
