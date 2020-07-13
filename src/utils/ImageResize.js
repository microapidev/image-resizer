const sharp = require("sharp");
const path = require("path");
const { options } = require("@hapi/joi");
const Jimp = require("jimp");

exports.resize = async (options) => {
  let { width, height, path: imagePath, format = "png" } = options;
  const name = `resized_image_${Date.now()}.${format.toLowerCase()}`;
  await sharp(imagePath)
    .toFormat(format.toLowerCase())
    .withMetadata()
    .resize({ width, height })
    .toFile(path.join(__dirname, `../images/${name}`));
  return name;
};

exports.crop = async (options) => {
  let { width, height, left, top, path: imagePath, format = "png" } = options;
  const name = `cropped_image_${Date.now()}.${format.toLowerCase()}`;
  await sharp(imagePath)
    .extract({ width, height, left, top })
    .withMetadata()
    .toFormat(format.toLowerCase())
    .toFile(path.join(__dirname, `../images/${name}`));
  return name;
};

exports.rotate = async (options) => {
  let { path: imagePath, angle, format = "png" } = options;
  const name = `rotated_image_${Date.now()}.${format.toLowerCase()}`;
  const image = await Jimp.read(imagePath);
  await image.rotate(angle).write(path.join(__dirname, `../images/${name}`));
  return name;
};
