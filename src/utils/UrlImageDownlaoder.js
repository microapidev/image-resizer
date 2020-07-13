const fs = require("fs");
const axios = require("axios");

module.exports = (url, image_path) =>
  axios({
    url,
    responseType: "stream",
  })
    .then(
      (response) =>
        new Promise((resolve, reject) => {
          response.data
            .pipe(fs.createWriteStream(image_path))
            .on("finish", () => resolve())
            .on("error", (e) => reject(e));
        })
    )
    .catch((error) => {
      if (error.message.indexOf("404") !== -1) {
        const err = new Error("There seems to be an error with the image url");
        err.status = 400;
        throw err;
      }
      error.message += "garri ";
      error.status = (error.response && error.response.status) || 500;
      throw error;
    });
