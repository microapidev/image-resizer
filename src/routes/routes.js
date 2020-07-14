const express = require("express");
const router = express.Router();
const path = require("path");
const Validation = require("../utils/Validator");
const Controller = require("../controllers/Controller");

router.post(
  "/v1/manipulate",
  Validation.routeValidation(),
  Controller.manipulateImage()
);

router.use("/v1/static", express.static(path.join(__dirname, "../images")));

module.exports = router;
