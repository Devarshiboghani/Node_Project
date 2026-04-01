const { body } = require("express-validator");

const bookValidation = [
    body("bookname").trim().notEmpty().withMessage("Bookname is Required"),
    body("authorname").trim().notEmpty().withMessage("Authorname is Required"),
    body("price").trim().notEmpty().withMessage("Price is Required"),
    body("quantity").trim().notEmpty().withMessage("Quantity is Required"),
    body("language").trim().notEmpty().withMessage("Language is Required"),
    body("category").trim().notEmpty().withMessage("Category is Required"),
];

module.exports = bookValidation;