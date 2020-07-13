const UrlImageDownload = require("../utils/UrlImageDownlaoder");
const Delete = require("../utils/FileDeleter");
const ImageManipulator = require("../utils/ImageResize");
const path = require("path");
const { url } = require("inspector");

exports.resizeImage = () => async (req, res, next) => {
  const { url, base64, width, height } = req.body;

  // Validate for image entry
  if (!url && !base64) {
    return res.status(422).json({
      status: false,
      message:
        "You have to provide an image for resizing to happen. You can do this in base64 format or a url",
    });
  }

  //Validate for resolutions
  if (!width && !height) {
    return res.status(422).json({
      status: false,
      message:
        "You have to provide either a height or a width or both for resizing to happen. Providing just the height or the width will maintain the images' aspect ratio.",
    });
  }

  try {
    const dir = path.resolve(
      __dirname,
      `../images/resizer_image_${Date.now()}.png`
    );
    await UrlImageDownload(req.body.url, dir);
    const name = await ImageManipulator.resize({
      path: dir,
      format: req.body.format,
      width,
      height,
    });
    Delete(dir);
    res.status(200).json({
      message:
        "image resized! This image will only be available for a day on our servers.",
      url: `${req.headers.host}/v1/static/${name}`,
    });
  } catch (error) {
    next(error);
  }
};

exports.cropImage = () => async (req, res, next) => {
  const { url, base64, width, height, top, left } = req.body;

  // Validate for image entry
  if (!url && !base64) {
    return res.status(422).json({
      status: false,
      message:
        "You have to provide an image for resizing to happen. You can do this in base64 format or a url",
    });
  }

  try {
    const dir = path.resolve(
      __dirname,
      `../images/cropper_image_${Date.now()}.png`
    );
    await UrlImageDownload(req.body.url, dir);
    const name = await ImageManipulator.crop({
      path: dir,
      format: req.body.format,
      width,
      height,
      left,
      top,
    });
    Delete(dir);
    res.status(200).json({
      message:
        "image cropped! This image will only be available for a day on our servers.",
      url: `${req.headers.host}/v1/static/${name}`,
    });
  } catch (error) {
    next(error);
  }
};

exports.rotate = () => async (req, res, next) => {
  const { url, angle, base64 } = req.body;

  // Validate for image entry
  if (!url && !base64) {
    return res.status(422).json({
      status: false,
      message:
        "You have to provide an image for resizing to happen. You can do this in base64 format or a url",
    });
  }

  try {
    const dir = path.resolve(
      __dirname,
      `../images/rotater_image_${Date.now()}.png`
    );
    await UrlImageDownload(req.body.url, dir);
    const name = await ImageManipulator.rotate({
      path: dir,
      format: req.body.format,
      angle,
    });
    Delete(dir);
    res.status(200).json({
      message:
        "image rotated! This image will only be available for a day on our servers.",
      url: `${req.headers.host}/v1/static/${name}`,
    });
  } catch (error) {
    next(error);
  }
};
