const express = require("express");
const mongoose = require("mongoose");
//config dotenv file
const dotenv = require("dotenv");
//create express app by calling express function
const app = express();
const { google } = require("googleapis");
const reviewRoute = require("./routes/reviews");
const userRoute = require("./routes/users");
const placeRoute = require("./routes/places");
const cors = require("cors");

app.use(cors());
app.use(express.json());
dotenv.config();
// const uri = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("mongo db connected");
  })
  .catch((err) => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/places", placeRoute);
//listen for server connection
app.listen(process.env.PORT || 5000, () => {
  console.log("backend server is connected");
});
