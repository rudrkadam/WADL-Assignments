// index.js
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');
const cors = require('cors');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://kaivalya1809:showpassword1234@cluster0.1wxigjc.mongodb.net/wadTest', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors());

// Delete a book by name
app.delete('/books/:name', async (req, res) => {
  const bookName = req.params.name;
  try {
    const deletedBook = await Book.findOneAndDelete({ name: bookName });
    if (deletedBook) {
      res.send('Book deleted successfully');
    } else {
      res.status(404).send('Book not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting book');
  }
});

// Update the price of a book by name
app.put('/books/:name', async (req, res) => {
  const bookName = req.params.name;
  const { newPrice } = req.body;
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { name: bookName },
      { price: newPrice },
      { new: true }
    );
    if (updatedBook) {
      res.send('Book price updated successfully');
    } else {
      res.status(404).send('Book not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating book price');
  }
});

// Add a new book
app.post('/books', async (req, res) => {
  const { name, author, price } = req.body;
  const book = new Book({ name, author, price });
  try {
    await book.save();
    res.send('Book added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding book');
  }
});

// Get book information by name
app.get('/books/:name', async (req, res) => {
  const bookName = req.params.name;
  try {
    const book = await Book.findOne({ name: bookName });
    if (book) {
      res.json(book);
    } else {
      res.status(404).send('Book not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving book');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
