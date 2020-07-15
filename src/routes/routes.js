const express = require("express");
const router = express.Router();
const path = require("path");
const Validation = require("../utils/Validator");
const Controller = require("../controllers/Controller");

router.post(
  "/v1/resize",
  Validation.resizingValidation(),
  Controller.resizeImage()
);
router.post(
  "/v1/crop",
  Validation.croppingValidation(),
  Controller.cropImage()
);
router.post("/v1/rotate", Validation.rotationValidation(), Controller.rotate());

router.use("/v1/static", express.static(path.join(__dirname, "../images")));

module.exports = router;
