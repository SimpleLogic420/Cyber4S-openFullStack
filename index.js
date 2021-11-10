const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv").config();
const personRouter = require("./routers/personRouter");
const infoRouter = require("./routers/infoRouter");
const morgan = require("morgan");
const path = require("path");
const cors =require("cors");
const password = process.env.password;
const userAdmin = process.env.userAdmin;


app.use(cors());
app.use(express.json());

const url= `mongodb+srv://${userAdmin}:${password}@cluster0.dtmhd.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url);//matbe url ?'mongodb://localhost:27017/usersdb'
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


app.use(express.static(path.resolve("./dist")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./dist/index.html"));
});

app.get("/addContact", (req, res) => {
  console.log("going to next page")
  res.sendFile(path.resolve("./dist/InfoPage.html"));
});

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use("/api/persons", personRouter);
app.use("/info/", infoRouter);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});