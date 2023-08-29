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
  if (!user_id) {
    throw new Error("Bitte stellen Sie sicher, dass Sie angemeldet sind.");
  }
  try {
    const books = await Book.find({ user_id });
    await res.send({ books });
  } catch (e) {
    res.status(400).send([e.message]);
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
  if (!user_id) {
    throw new Error("Bitte stellen Sie sicher, dass Sie angemeldet sind.");
  }
  const { title, subtitle, authors, published, content, genre } = req.body;
  let image;
  if (!req.file) {
    image = null;
  } else {
    image = req.file.filename;
  }

  const authorsArray = authors.split("<br>").map((author, i) => ({
    id: i,
    author,
  }));

  const contentArray = content.split("<br>").map((paragraph, i) => ({
    id: i,
    paragraph,
  }));

  const book = {
    title,
    subtitle,
    authors: authorsArray,
    published,
    image,
    content: contentArray,
    genre,
    user_id,
  };

  if (!title) {
    throw new Error("Bitte geben Sie einen Titel an.");
  }
  if (!authors) {
    throw new Error("Bitte geben Sie einen Autor an.");
  }
  try {
    const newBook = await new Book(book);
    if (!newBook)
      throw new Error(
        "Die Buch-Informationen konnten nicht verarbeitet werden."
      );

    const titleExists = await Book.findOne({ title });
    if (titleExists) throw new Error("Dieser Buchtitel existiert bereits.");

    await newBook.save();
    res.status(200).send(book);
  } catch (e) {
    res.status(400).send([e.message]);
  }
};
