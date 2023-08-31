const express = require("express");
const path = require("path");
const bookControllers = require("../controllers/bookControllers");
const { createBookValidation } = require("../helpers/validation");
const checkAuth = require("../middleware/check-auth");
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

const upload = multer({
  storage: storage,
});

const router = express.Router();

// not authenticated users should not be allowed to create a book entry.
// therefore i create a middleware that prohibts access to routes below of middlerware

router.use(checkAuth);

router.get("/books/:id", bookControllers.getBookById);
router.get("/books", bookControllers.getAllBooks);

router.post(
  "/books/add",
  upload.single("image"),
  createBookValidation,
  bookControllers.postCreateBook
);

module.exports = router;
