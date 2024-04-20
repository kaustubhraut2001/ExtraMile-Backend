// importing the required modules
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const dbConnection = require("./utils/dbConnection");


// conneting to mongodb database
dbConnection();


const app = express();
const PORT = process.env.PORT || 5000; // getting the port from .env file


// express middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    "/api/employees",
    require("./Router/Employees.Router")
);

// roures
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});