const Book = require("../model/book.model");
const { validationResult } = require("express-validator");
const fs = require('fs');
const path = require("path");

exports.addNewBook = async (req, res) => {
    try {
        let errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.json({ message: "Error Exist", Err: errors.array() });
        }

        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        let book = await Book.create({
            ...req.body,
            image: imagePath
        });

        return res.json({ message: "Book Added", book});

    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const { search, sortby, sortorder } = req.query;

        let filter = {}; 

        if (search) {
            filter = {
                $or: [
                    { bookname: {$regex: search, $options: "i"} },
                    { authorname: {$regex: search, $options: "i"} },
                ],
            };
        }

        let sort = {};

        if (sortby) {
            sort[sortby] = sortorder === "asc" ? 1 : -1;
        }
        let books = await Book.find(filter).sort(sort);

        return res.json({ message: "Fetch All Books", books})

    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
};

exports.getBook = async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);
        if (!book) {
            return res.json({ message: "Book Not Found "});
        }

        return res.json({ message: "Book Fetched", book})

    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
}

exports.updateBook = async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);
        if (!book) {
            return res.json({ message: "Book Not Found" });
        }

        let imagePath = book.image;
        if (req.file) {
            if(imagePath != "") {
                try {
                    await fs.unlinkSync(path.join(__dirname, "..", imagePath));
                } catch (error) {
                    console.log("File Missing");
                }
            }
            imagePath = `/uploads/${req.file.filename}`;
        }

        book = await Book.findByIdAndUpdate(
            book._id,
            {
                ...req.body,
                image: imagePath,
            },
            {
                 returnDocument: 'after' 
            }
        );

        return res.json({ message: "Book Update Success", book});

    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
}

exports.deleteBook = async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);
        if (!book) {
            return res.json({ message: "Book Not Found" });
        }

        let imagePath = book.image;
            if(imagePath != "") {
                try {
                    await fs.unlinkSync(path.join(__dirname, "..", imagePath));
                } catch (error) {
                    console.log("File Missing");
                }
            }
            
        book = await Book.findByIdAndDelete(book._id);
        return res.json({ message: "Book Delete Success", book });

    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
}