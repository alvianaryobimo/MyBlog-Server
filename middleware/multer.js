const multer = require("multer");
const fs = require("fs");

module.exports = {
    multerUpload: (directory = "./Public", name = "PIMG") => {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, directory)
            },
            filename: (req, file, cb) => {
                cb(null, name +
                    "-" +
                    Date.now() +
                    Math.round(Math.random() * 100000) +
                    "." +
                    file.mimetype.split("/")[1]);
            }
        });
        const fileFilter = (req, file, cb) => {
            const exFilter = ['jpg', 'jpeg', 'png', 'gif']
            const checkExt = exFilter.includes(file.mimetype.split("/")[1].toLowerCase());
            // const { imageProfile } = req.user
            // if (name === "avatar") {
            //     if (imageProfile !== null) {
            //         fs.unlinkSync(`${directory}/${imageProfile}`);
            //     }
            // }
            if (!checkExt) {
                cb(new Error("Doesn't support file type"), false);
            } else {
                cb(null, true);
            }
        }
        const fileLimit = 1024 * 1024;
        return multer({ storage, fileFilter, limits: { fileSize: fileLimit } });
    }
}