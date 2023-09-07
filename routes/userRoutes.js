const express = require("express");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.post("/users", userControllers.postCreateUser);

module.exports = router;
