const multer = require("multer");
var path = require('path');
const GridFsStorage = require("multer-gridfs-storage");


const storage = new GridFsStorage({
    url: process.env.MONGODBURL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        console.log("========== FILE ==========");
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-any-name-${file.originalname}`;
            return {
                filename: filename,
                // metadata: req.locals.myusername
            };
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-any-name-${file.originalname}`,
            // metadata: req.locals.myusername
        };
    },
});

module.exports = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(null,false);
        }
        callback(null, true)
    }
});
