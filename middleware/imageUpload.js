const multer = require("multer");

const date = new Date(Date.now());
const splittedDate = String(date.toLocaleDateString("de-DE"))
  .split("T")[0]
  .split(".");
const year = splittedDate[2];
const month =
  splittedDate[1].length === 1 ? `0${splittedDate[1]}` : splittedDate[1];
const day =
  splittedDate[0].length === 1 ? `0${splittedDate[0]}` : splittedDate[0];
const constructedDate = `${year}-${month}-${day}_`;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    // cb(null, constructedDate + file.originalname);
    cb(null, file.originalname);
  },
});

const imageUpload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedFileType = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedFileType.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

module.exports = imageUpload;
