// models/Book.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  author: String,
  price: Number
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
