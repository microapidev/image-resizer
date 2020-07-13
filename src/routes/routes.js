const express = require("express");
const router = express.Router();
const path = require("path");
const Validation = require("../utils/Validator");
const Controller = require("../controllers/ImageResizeCotroller");

router.post(
  "/v1/resize",
  Validation.resizingValidation(),
  Controller.resizeImage()
);
router.use("/v1/static", express.static(path.join(__dirname, "../images")));

module.exports = router;
