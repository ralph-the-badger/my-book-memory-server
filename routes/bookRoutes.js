const express = require("express");
const bookControllers = require("../controllers/bookControllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/book/:id", bookControllers.getBookById);

// not authenticated users should not be allowed to create a book entry.
// therefore i create a middleware that prohibts access to routes below of middlerware

router.use(checkAuth);

router.get("/books", bookControllers.getAllBooks);
router.post("/books", bookControllers.postCreateBook);

module.exports = router;
