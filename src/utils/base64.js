const fs = require("fs");
const path = require("path");

module.exports = async (base64, path) => {
  const buff = Buffer.from(base64, "base64");
  return fs.writeFile(path, buff, (err) => {
    if (err) throw err;
  });
};
