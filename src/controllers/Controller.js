const UrlImageDownload = require("../utils/UrlImageDownlaoder");
const ImageManipulator = require("../utils/ImageResize");
const Base64Converter = require("../utils/base64");
const path = require("path");

exports.resizeImage = () => async (req, res, next) => {
  let { url, base64, width, height } = req.query;
  width = parseInt(width);
  height = parseInt(height);

  // Validate for image entry
  if (!url && !base64) {
    return res.status(422).json({
      status: false,
      message:
        "You have to provide an image for manipulation to happen. You can do this in base64 format or a url",
    });
  }

  //Validate for resolutions
  if (!width && !height && !angle) {
    return res.status(422).json({
      status: false,
      message:
        "You have to provide at least either a height, width or angle for image manipulation to happen. Providing just the height or the width will maintain the images' aspect ratio if you're doing dimension operations.",
    });
  }

  try {
    let dir = path.resolve(
      __dirname,
      `../images/manipulation_image_${Date.now()}.png`
    );

    if (url) await UrlImageDownload(req.query.url, dir);
    else await Base64Converter(base64, dir);

    const name = await ImageManipulator.resize({
      path: dir,
      format: req.query.format,
      width,
      height,
    });
    Delete(dir);
    res.status(200).json({
      status: true,
      message:
        "image resized! This image will only be available for a day on our servers.",
      url: `${req.headers.host}/v1/static/${name}`,
    });
  } catch (error) {
    next(error);
  }
};

exports.cropImage = () => async (req, res, next) => {
  let { url, base64, width, height, top, left } = req.query;
  width = parseInt(width);
  height = parseInt(height);
  top = parseInt(top);
  left = parseInt(left);

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

    if (url) await UrlImageDownload(req.query.url, dir);
    else await Base64Converter(base64, dir);

    const name = await ImageManipulator.crop({
      path: dir,
      format: req.query.format,
      width,
      height,
      left,
      top,
    });
    Delete(dir);
    res.status(200).json({
      status: true,
      message:
        "image cropped! This image will only be available for a day on our servers.",
      url: `${req.headers.host}/v1/static/${name}`,
    });
  } catch (error) {
    next(error);
  }
};

exports.rotate = () => async (req, res, next) => {
  let { url, angle, base64 } = req.query;
  angle = parseInt(angle);

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

    if (url) await UrlImageDownload(req.query.url, dir);
    else await Base64Converter(base64, dir);

    const name = await ImageManipulator.rotate({
      path: dir,
      format: req.query.format,
      angle,
    });
    Delete(dir);
    res.status(200).json({
      status: true,
      message:
        "image manipulated! This image will only be available for a day on our servers.",
      url: `${req.headers.host}/v1/static/${name}`,
    });
  } catch (error) {
    next(error);
  }
};
