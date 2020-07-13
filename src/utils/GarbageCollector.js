const fs = require("fs");

module.exports = function GarbageCollection() {
    try {
        let directory = "../images"
        let dirBuff = Buffer.from(directory)

        fs.readdir(dirBuff, (error, files) => {
            if (error) {

                console.log(error.message);

            }
            else {
                for (file in files) {
                    const { birthtime } = fs.statSync(file);
                    var date = new Date();
                    date.setDate(birthtime.getDate() + 1)
                    if (birthtime >= date) {

                        fs.unlink(file);
                    }

                }

            }
        })
    }
    catch (error) {
        if (error.message.indexOf("404") !== -1) {
            const err = new Error("There seems to be an error with the deleting the image");
            err.status = 400;
            throw err;
        }
        error.status = error.response.status;
        throw error;

    }
}
