const express = require("express");
const bookControllers = require("../controllers/bookControllers");

const router = express.Router();

router.get("/books", bookControllers.getAllBooks);
router.get("/book/:id", bookControllers.getBookById);
router.post("/books", bookControllers.postCreateBook);

module.exports = router;
