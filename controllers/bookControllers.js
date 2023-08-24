// const express = require("express");
// const User = require("../models/user");

const books = [
  {
    id: 1,
    name: "Der Herr der Ringe - Die Gefährten",
    author: "J. R. R. Tolkien",
  },
  {
    id: 2,
    name: "Der Herr der Ringe - Die zwei Türme",
    author: "J. R. R. Tolkien",
  },
  {
    id: 3,
    name: "Der Herr der Ringe - Die Rückkehr ders Königs",
    author: "J. R. R. Tolkien",
  },
];

exports.getAllBooks = async (req, res) => {
  try {
    await res.json({ books: books });
  } catch (e) {
    console.log(e);
  }
};

exports.getBookById = async function (req, res) {
  console.log(req);
  //   try {
  //     await res.send({ user: users[1] });
  //   } catch (e) {
  //     console.log(e);
  //   }
};

exports.postCreateBook = async function (req, res) {
  console.log(req);
  //   let user = await new User({
  //     name: req.name,
  //     password: req.password,
  //   });
  //   try {
  //     await user.save();
  //     res.redirect("/");
  //   } catch (e) {
  //     console.log(e);
  //   }
};
