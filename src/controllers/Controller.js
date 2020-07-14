const UrlImageDownload = require("../utils/UrlImageDownlaoder");
const ImageManipulator = require("../utils/ImageResize");
const Base64Converter = require("../utils/base64");
const path = require("path");

exports.manipulateImage = () => async (req, res, next) => {
  const { url, base64, width, height, angle, top, left } = req.body;

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

    if (url) await UrlImageDownload(req.body.url, dir);
    else await Base64Converter(base64, dir);

    let name;
    if (width && height && top && left)
      name = await ImageManipulator.crop({
        path: dir,
        format: req.body.format,
        width,
        height,
        left,
        top,
      });
    if ((width || height) && !name)
      name = await ImageManipulator.resize({
        path: dir,
        format: req.body.format,
        width,
        height,
      });
    dir = name ? path.resolve(__dirname, `../images/${name}`) : dir;
    if (angle)
      name = await ImageManipulator.rotate({
        path: dir,
        format: req.body.format,
        angle,
      });
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
