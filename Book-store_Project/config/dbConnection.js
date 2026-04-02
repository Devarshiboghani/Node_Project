const mongoose = require("mongoose");

// DB Connection
const dbConnect = () => {
    // mongoose.connect("mongodb://127.0.0.1:27017/book")
    mongoose.connect("mongodb+srv://boghanidevarshi_db_user:DevarshiBoghani@cluster0.kq8nhm0.mongodb.net/book")
    .then(() => console.log("DB Connect"))
    .catch(err => console.log(err));
}

module.exports = dbConnect;