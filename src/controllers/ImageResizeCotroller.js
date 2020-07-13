const UrlImageDownload = require("../utils/UrlImageDownlaoder");
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
    const name = `resized_image_${Date.now()}.png`;
    const dir = path.resolve(__dirname, `../images/${name}`);
    await UrlImageDownload(req.body.url, dir);
    res.status(200).json({
      message:
        "image resized! This image will only be available for a day on our servers.",
      url: `${req.headers.host}/v1/static/${name}`,
    });
  } catch (error) {
    next(error);
  }
};
