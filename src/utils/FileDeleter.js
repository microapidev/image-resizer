const fs = require("fs");

module.exports = (file) => {
  fs.unlink(file, (err) => {
    if (err)
      console.log({
        ...err,
        message: err.message,
      });
  });
};
