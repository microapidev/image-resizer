const fs = require("fs");
const path = require("path");

module.exports = function GarbageCollection() {
  try {
    let directory = path.join(__dirname, "../images");
    let dirBuff = Buffer.from(directory);

    fs.readdir(dirBuff, (error, files) => {
      if (error) {
        console.log(error.message);
      } else {
        for (file in files) {
          const { birthtime } = fs.statSync(file);
          var date = new Date();
          date.setDate(birthtime.getDate() + 1);
          if (birthtime.getTime() >= date.getTime()) {
            fs.unlink(file);
          }
        }
      }
    });
  } catch (error) {
    console.log("garbage collection error: ", error);
  }
  setTimeout(
    GarbageCollection,
    86400000 * (process.env.GARBAGE_COLLECTION_INTERVAL || 1)
  );
};
