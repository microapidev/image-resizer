const sharp = require('sharp')

module.exports = function resize(images, width, height) {
  let transform = sharp()
try{
  if (format) {
    transform = transform.toFormat(format)
  }

  if (width || height) {
    width = parseInt(widthString)
    height = parseInt(heightString)
    transform = transform.resize(width, height)
  }

  return images.pipe(transform)
}
  catch(error){

    if (error.message.indexOf("404") !== -1) {
        const err = new Error("There seems to be an error with resizing the image");
        err.status = 400;
        throw err;
      }
      error.status = error.response.status;
      throw error;
  }
}