const express = require("express");
const bookControllers = require("../controllers/bookControllers");
const {
  createBookValidation,
  updateBookValidation,
} = require("../helpers/validation");
const checkAuth = require("../middleware/check-auth");
const imageUpload = require("../middleware/imageUpload");

const router = express.Router();

// not authenticated users should not be allowed to create a book entry.
// therefore i create a middleware that prohibts access to routes below of middlerware
router.use(checkAuth);

router.get("/books/:id", bookControllers.getBookById);
router.get("/books", bookControllers.getAllBooks);

router.post(
  "/books/add",
  imageUpload.single("image"),
  createBookValidation,
  bookControllers.postCreateBook
);

router.post(
  "/books/edit",
  updateBookValidation,
  bookControllers.udpateBookById
);

router.delete("/books/:id", bookControllers.deleteBookById);

module.exports = router;
