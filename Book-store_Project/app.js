const express = require('express');
const port = 7000;
const app = express();
const dbConnect = require('./config/dbConnection');

// db Connection
dbConnect();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api", require("./routes/book.routes"));

app.listen(port, () => {
    console.log(`Server start http://localhost:${port}`);
})