const express = require("express");
const User = require("../models/user");

exports.postCreateUser = async function (req, res) {
  let user = await new User({
    name: req.name,
    password: req.password,
  });
  try {
    await user.save();
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};
