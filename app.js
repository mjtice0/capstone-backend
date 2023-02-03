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

//google client id
// 378108455634-lrlubhjt406ecuvvca90o1rsg0blbg7g.apps.googleusercontent.com
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("mongo db connected");
  })
  .catch((err) => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/places", placeRoute);
//listen for server connection
app.listen(8800, () => {
  console.log("backend server is connected");
});
