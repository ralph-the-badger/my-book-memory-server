const express = require("express");
const User = require("../models/user");

exports.getLogin = async (req, res) => {
  console.log(req);
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const { error } = req;
  if (error) {
    return res.status(400).send(error);
  }
  try {
    if ((email, password)) {
      const userExists = await User.findOne({ email });
      if (!userExists)
        throw new Error(
          "Dieser User ist nicht registriert! Bitte überprüfen Sie Ihre Angaben oder registrieren sich."
        );
      if (userExists.password !== password)
        throw new Error(
          "Die Angaben stimmen nicht überein! Bitte überprüfen Sie Ihre Angaben oder registrieren sich."
        );
      res.status(200).send(userExists);
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
  try {
    if ((name, email, password)) {
      const newUser = await new User({
        name: name,
        email: email,
        password: password,
      });
      if (!newUser)
        throw new Error("User-Daten konnten nicht verarbeitet werden.");
      const nameExists = await User.findOne({ name });
      if (nameExists) throw new Error("Dieser Benutzername existiert bereits!");
      const emailExists = await User.findOne({ email });
      if (emailExists) throw new Error("Diese E-Mail existiert bereits!");
      const savedUser = await newUser.save();
      res.status(200).send(savedUser);
    }
  } catch (e) {
    res.status(400).send([e.message]);
  }
};
