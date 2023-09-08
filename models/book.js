const mongoose = require("mongoose");

const bookId = new mongoose.Types.ObjectId();

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: false },
    subtitle: { type: String },
    authors: { type: Array, required: true, unique: false },
    genre: { type: String, unique: false },
    published: { type: Date, default: Date.now },
    image: { type: String },
    img: { data: Buffer, contentType: String },
    File: { type: Object },
    content: { type: Array },
    myRating: { type: Number },
    user_id: { type: String },
  },
  { timestamps: true, required: true }
);

module.exports = mongoose.model("Book", bookSchema);
