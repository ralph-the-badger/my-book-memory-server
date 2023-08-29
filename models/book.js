const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    authors: { type: Array, required: true },
    genre: { type: String },
    published: { type: Date, default: Date.now },
    image: { type: String },
    content: { type: Array },
    myRating: { type: Number },
    user_id: { type: String },
  },
  { timestamps: true, required: true }
);

module.exports = mongoose.model("Book", bookSchema);
