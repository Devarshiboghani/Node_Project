const mongoose = require("mongoose");

// DB Connection
const dbConnect = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/book")
    .then(() => console.log("DB Connect"))
    .catch(err => console.log(err));
}

module.exports = dbConnect;