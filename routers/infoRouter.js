const express = require("express");
const moment = require("moment");
const fs = require("fs/promises");
const infoRouter = express.Router();
const Person = require("../mongodb/mongoPerson");

infoRouter.get("/", async (request, response) => {
  response.send(
    `Phonebook has info for ${await Person.find(
      {}
    ).count()} peaple.\n${new Date()}`
  );
});
module.exports = infoRouter;

