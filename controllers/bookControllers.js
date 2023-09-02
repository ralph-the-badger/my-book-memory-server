// const express = require("express");
const Book = require("../models/book");

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
  const bookId = req.params.id;
  const user_id = req.userId._id;

  if (!user_id) {
    throw new Error("Bitte stellen Sie sicher, dass Sie angemeldet sind.");
  }
  try {
    const book = await Book.find({ _id: bookId, user_id });
    await res.send({ book });
  } catch (e) {
    res.status(400).send([e.message]);
  }
};

exports.postCreateBook = async function (req, res) {
  const user_id = req.userId._id;
  if (!user_id) {
    throw new Error("Bitte stellen Sie sicher, dass Sie angemeldet sind.");
  }
  const { title, subtitle, authors, published, content, genre } = req.body;
  let image;
  let file;
  if (!req.file) {
    image = null;
    File = null;
  } else {
    image = req.file.filename;
    File = req.file;
  }

  const authorsArray = authors.split("|").map((author, i) => ({
    id: i,
    author,
  }));

  const contentArray = content.split("|").map((paragraph, i) => ({
    id: i,
    paragraph,
  }));

  console.log(authorsArray);
  console.log(contentArray);

  const book = {
    title,
    subtitle,
    authors: authorsArray,
    published,
    image,
    content: contentArray,
    genre,
    user_id,
    File,
  };

  if (!title) {
    throw new Error("Bitte geben Sie einen Titel an.");
  }
  if (!authors) {
    throw new Error("Bitte geben Sie einen Autor an.");
  }
  try {
    const newBook = await new Book(book);
    console.log(newBook);
    if (!newBook)
      throw new Error(
        "Die Buch-Informationen konnten nicht verarbeitet werden."
      );

    // const titleExists = await Book.findOne({ title });
    // if (titleExists) throw new Error("Dieser Buchtitel existiert bereits.");

    await newBook.save();
    res.status(200).send(book);
  } catch (e) {
    res.status(400).send([e.message]);
  }
};

exports.udpateBookById = async function (req, res) {
  const user_id = req.userId._id;
  // console.log(req);
  if (!user_id) {
    throw new Error("Bitte stellen Sie sicher, dass Sie angemeldet sind.");
  }
  const { bookId, title, subtitle, authors, published, content, genre } =
    req.body;

  if (!title) {
    throw new Error("Bitte geben Sie einen Titel an.");
  }
  if (!authors) {
    throw new Error("Bitte geben Sie einen Autor an.");
  }

  const authorsArray = authors.split("|").map((author, i) => ({
    id: i,
    author,
  }));

  const contentArray = content.split("|").map((paragraph, i) => ({
    id: i,
    paragraph,
  }));

  console.log(authorsArray);
  console.log(contentArray);

  try {
    const book = {
      title,
      subtitle,
      authors: authorsArray,
      published,
      content: contentArray,
      genre,
    };
    const existingBook = await Book.findOneAndUpdate({ _id: bookId }, book, {
      new: true,
    });
    if (!existingBook)
      throw new Error("Das Bucht kannte nicht angepasst werden.");
    res.status(200).send(existingBook);
  } catch (e) {
    res.status(400).send([e.message]);
  }
};
