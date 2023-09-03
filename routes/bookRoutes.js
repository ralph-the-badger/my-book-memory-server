const express = require("express");
const path = require("path");
const bookControllers = require("../controllers/bookControllers");
const { createBookValidation } = require("../helpers/validation");
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
  // createBookValidation,
  bookControllers.udpateBookById
);

router.delete(
  "/books/:id",
  // createBookValidation,
  bookControllers.deleteBookById
);

module.exports = router;
