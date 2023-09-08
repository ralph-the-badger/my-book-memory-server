const fs = require("fs");
const Book = require("../models/book");

exports.getAllBooks = async (req, res) => {
  try {
    if (req.userId === null) {
      throw new Error(
        "Die Session ist abgelaufen. Bitte melde dich erneut an."
      );
    }
    const user_id = req.userId._id;
    if (!user_id) {
      throw new Error("Bitte stelle sicher, dass du angemeldet bist.");
    }
    const books = await Book.find({ user_id });
    await res.status(200).json({ books });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.getBookById = async function (req, res) {
  try {
    if (req.userId === null) {
      throw new Error(
        "Die Session ist abgelaufen. Bitte melde dich erneut an."
      );
    }

    const bookId = req.params.id;
    const user_id = req.userId._id;

    if (!user_id) {
      throw new Error("Bitte stelle sicher, dass du angemeldet bist.");
    }
    const book = await Book.find({ _id: bookId, user_id });
    await res.status(200).json({ book });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.postCreateBook = async function (req, res) {
  try {
    if (req.userId === null) {
      throw new Error(
        "Die Session ist abgelaufen. Bitte melde dich erneut an."
      );
    }

    const user_id = req.userId._id;
    if (!user_id) {
      throw new Error("Bitte stellen sicher, dass du angemeldet bist.");
    }
    const { title, subtitle, authors, published, content, genre } = req.body;
    let image;
    let File;
    if (!req.file || req.file === null) {
      image = "book-logo.png";
      File = {
        fieldname: "image",
        originalname: "book-logo.png",
        encoding: "7bit",
        mimetype: "image/png",
        destination: "public/images/",
        filename: "book-logo.png",
        path: "public/images/book-logo.png",
        size: 12721,
      };
    } else {
      image = req.file.filename;
      File = req.file;
    }

    if (!title || title === "") {
      throw new Error("Bitte gib einen Titel an.");
    }
    if (!authors || authors === "" || authors.length === 0) {
      throw new Error("Bitte gib mindestens einen Autor an.");
    }

    const authorsArray = authors.split("|").map((author, i) => ({
      id: i,
      author,
    }));

    const contentArray = content.split("|").map((paragraph, i) => ({
      id: i,
      paragraph,
    }));

    const book = {
      title,
      subtitle,
      authors: authorsArray,
      published,
      image,
      img: {
        data: fs.readFileSync("public/images/" + image),
        contentType: "image/png",
      },
      content: contentArray,
      genre,
      user_id,
      File,
    };

    const newBook = await new Book(book);
    if (!newBook)
      throw new Error(
        "Die Buch-Informationen konnten nicht verarbeitet werden."
      );

    await newBook.save();
    await res.status(200).json({ book });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.udpateBookById = async function (req, res) {
  try {
    if (req.userId === null) {
      throw new Error(
        "Die Session ist abgelaufen. Bitte melde dich erneut an."
      );
    }
    const user_id = req.userId._id;

    if (!user_id) {
      throw new Error("Bitte vergewissere dich, dass du angemeldet bist.");
    }
    const { bookId, title, subtitle, authors, published, content, genre } =
      req.body;

    if (!title || title === "") {
      throw new Error("Bitte gib einen Titel an.");
    }
    if (!authors || authors === "" || authors.length === 0) {
      throw new Error("Bitte gib mindestens einen Autor an.");
    }

    const authorsArray = authors.split("|").map((author, i) => ({
      id: i,
      author,
    }));

    const contentArray = content.split("|").map((paragraph, i) => ({
      id: i,
      paragraph,
    }));

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
    if (!existingBook) {
      throw new Error(
        "Das Buch konnte leider nicht angepasst werden. Bitte versuche es noch einmal."
      );
    }
    await res.status(200).json({ existingBook });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.deleteBookById = async function (req, res) {
  try {
    if (req.userId === null) {
      throw new Error(
        "Die Session ist abgelaufen. Bitte melde dich erneut an."
      );
    }

    const user_id = req.userId._id;
    const id = req.params.id;
    if (!user_id) {
      throw new Error("Bitte vergewissere dich, dass du angemeldet bist.");
    }
    const book = await Book.findOneAndDelete({ _id: id });

    if (!book) {
      throw new Error("Das Buch konnte leider nicht identifiziert werden.");
    }
    await res.status(200).send("Das Buch wurde gelöscht.");
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};
