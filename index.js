const express = require("express");
const mongoose = require("mongoose");
const app = express();
const personRouter = require("./routers/personRouter");
const infoRouter = require("./routers/infoRouter");
const morgan = require("morgan");
const path = require("path");

app.use(express.json());
app.use(express.static(path.resolve("./dist")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./dist/index.html"));
});

app.get("/addContact", (req, res) => {
  console.log("going to next page")
  res.sendFile(path.resolve("./dist/addContact.html"));
});

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use("/api/persons", personRouter);
app.use("/info/", infoRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//
