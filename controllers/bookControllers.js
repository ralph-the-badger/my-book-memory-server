// const express = require("express");
const Book = require("../models/book");

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
    name: "Der Herr der Ringe - Die Rückkehr des Königs",
    author: "J. R. R. Tolkien",
  },
];

exports.getAllBooks = async (req, res) => {
  const user_id = req.userId._id;
  try {
    const books = await Book.find({ user_id });
    await res.send({ books });
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
  const user_id = req.userId._id;
  const { title, authors } = req.body;
  try {
    const book = await Book.create({ title, authors, user_id });
    res.status(200).send(book);
  } catch (e) {
    console.log(e);
  }
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
