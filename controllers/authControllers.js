const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const User = require("../models/user");

dotenv.config({ path: "../config/.env" });

exports.getLogin = async (req, res) => {
  console.log(req);
};

const createToken = function (id) {
  return jwt.sign({ id }, process.env.TOKEN_PRIVATE_KEY, { expiresIn: "6h" });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const { error } = req;
  if (error) {
    return res.status(400).send(error);
  }
  if (!email || !password) {
    throw new Error("Bitte füllen Sie jedes Feld aus.");
  }
  try {
    if ((email, password)) {
      const userExists = await User.findOne({ email });

      if (!userExists)
        throw new Error(
          "Dieser User ist nicht registriert! Bitte überprüfen Sie Ihre Angaben oder registrieren sich."
        );

      let isValidPassword = false;
      isValidPassword = await bcrypt.compare(password, userExists.password);

      if (!isValidPassword)
        throw new Error(
          "Die Angaben stimmen nicht überein! Bitte überprüfen Sie Ihre Angaben oder registrieren sich."
        );

      // let token;
      // token = jwt.sign(
      //   { userId: userExists.id, name: userExists.name },
      //   process.env.TOKEN_PRIVATE_KEY,
      //   { expiresIn: "6h" }
      // );
      const token = createToken(userExists.id);

      const validatedUser = {
        id: userExists.id,
        email: userExists.email,
        name: userExists.name,
        token,
      };

      res.status(200).send(validatedUser);
    }
  } catch (e) {
    res.status(400).send([e.message]);
  }
};

// exports.getRegister = async (req, res) => {
//   console.log(req);
// };

exports.postRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const { error } = req;
  if (error) {
    return res.status(400).send(error);
  }
  if (!name || !email || !password) {
    throw new Error("Bitte füllen Sie jedes Feld aus.");
  }
  try {
    if ((name, email, password)) {
      const salt = await bcrypt.genSalt(12);
      let hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      if (!newUser)
        throw new Error("User-Daten konnten nicht verarbeitet werden.");

      const nameExists = await User.findOne({ name });
      if (nameExists) throw new Error("Dieser Benutzername existiert bereits!");

      const emailExists = await User.findOne({ email });
      if (emailExists) throw new Error("Diese E-Mail existiert bereits!");

      const createdUser = await newUser.save();

      // let token;
      // token = jwt.sign(
      //   { userId: createdUser.id, name: createdUser.name },
      //   process.env.TOKEN_PRIVATE_KEY,
      //   { expiresIn: "6h" }
      // );

      const token = createToken(createdUser.id);

      const savedUser = {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        token,
      };

      res.status(200).send(savedUser);
    }
  } catch (e) {
    res.status(400).send([e.message]);
  }
};
