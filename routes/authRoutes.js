const express = require("express");
const authControllers = require("../controllers/authControllers");
const {
  registerUserValidation,
  loginUserValidation,
} = require("../helpers/validation");

const router = express.Router();

router.get("/login", authControllers.getLogin);
router.post("/login", loginUserValidation, authControllers.postLogin);
// router.get("/register", authControllers.getRegister);
router.post("/register", registerUserValidation, authControllers.postRegister);

module.exports = router;
