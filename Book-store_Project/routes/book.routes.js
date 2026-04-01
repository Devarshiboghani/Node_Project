const express = require('express');
const routes = express.Router();

const { addNewBook, getAllBooks, getBook, updateBook, deleteBook } = require("../controller/book.controller.js");
const uploadImage = require("../middleware/uploadImage.js");
const bookValidation = require('../middleware/validationBook.js');


// Add Book
routes.post("/add-book", uploadImage.single('image'), bookValidation, addNewBook);

// Get All Books
routes.get("/all-books", getAllBooks);

// Get Single Book
routes.get("/single-book/:id", getBook);

// update Book
routes.put("/update-book/:id", uploadImage.single('image'), bookValidation, updateBook);

// Delete Book
routes.delete("/delete-book/:id", deleteBook);


module.exports = routes;