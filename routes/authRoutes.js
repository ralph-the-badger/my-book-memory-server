const express = require("express");
const authControllers = require("../controllers/authControllers");
const {
  registerUserValidation,
  loginUserValidation,
} = require("../helpers/validation");

const router = express.Router();

router.post("/login", loginUserValidation, authControllers.postLogin);

router.post("/register", registerUserValidation, authControllers.postRegister);

module.exports = router;
