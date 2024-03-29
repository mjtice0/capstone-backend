const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const { google } = require("googleapis");
const reviewRoute = require("./routes/reviews");
const userRoute = require("./routes/users");
const placeRoute = require("./routes/places");
const cors = require("cors");
const crypto = require("crypto");

// const secretKey = crypto.randomBytes(32).toString("hex");
// console.log("Secret Key:", secretKey);

// const jwtConfig = {
//   secret: secretKey,
//   expiresIn: "3h",
// };
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.error("JWT secret key is not defined in environment variables.");
  process.exit(1); // Exit the application if JWT secret key is not defined
}

app.use(cors());
app.use(express.json());
dotenv.config();

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
