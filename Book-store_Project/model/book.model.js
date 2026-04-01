const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    bookname : String,
    authorname : String,
    price : Number,
    quantity : Number,
    language : String,
    category : String,
    image : String,
})

const Book = mongoose.model("Book", bookSchema)

module.exports = Book;