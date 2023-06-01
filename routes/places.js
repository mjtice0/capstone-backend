const router = require("express").Router();
const { default: axios } = require("axios");
const express = require("express");
const request = require("express");

router.get("", async (req, res, next) => {
  try {
    const apiKey = prcocess.env(GOOGLE_URL);
    // const query = 'restaurants';
    const query =
      "Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry";
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&key=${apiKey}`;
    console.log(url);
    axios.get(url).then((response) => {
      res.status(200).send(response.data);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
