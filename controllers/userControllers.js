// import User from "../models/User";

// export const postCreateUser = async (req, res) => {
//   let user = await new User({
//     name: req.body.name,
//     password: req.body.password,
//   });
//   try {
//     user = await user.save();
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const getAllUsers = async (req, res) => {
//   try {
//     res.send("Bubu4, Bubu5");
//   } catch (e) {
//     console.log(e);
//   }
// };

const express = require("express");
const User = require("../models/user");

const users = [
  { id: 1, name: "badger_rr", password: "password" },
  { id: 2, name: "ralphi", password: 123 },
];

exports.getAllUsers = async (req, res) => {
  try {
    await res.send({ users: users });
  } catch (e) {
    console.log(e);
  }
};

exports.getUserById = async function (req, res) {
  try {
    await res.send({ user: users[1] });
  } catch (e) {
    console.log(e);
  }
};

exports.postCreateUser = async function (req, res) {
  console.log(req);
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
