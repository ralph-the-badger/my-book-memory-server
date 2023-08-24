const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: Array, required: true },
  category: { type: String },
  language: { type: String },
  published: { type: Date, default: Date.now },
  image: { type: String },
  content: { type: String },
  myRating: { type: Number },
  user_id: { type: String },
});

module.exports = mongoose.model("Book", bookSchema);
