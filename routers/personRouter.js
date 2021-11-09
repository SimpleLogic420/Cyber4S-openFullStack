const express = require("express");
const moment = require("moment");
const fs = require("fs/promises");
const { response } = require("express");
const personRouter = express.Router();
const Person = require("../mongodb/mongoPerson");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function isNameExist(name, fileData) {
  return fileData.findIndex((obj) => obj.name === name) !== -1;
}


personRouter.get("/", async (request, response) => {
  response.send(await Person.find({}));
});

personRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const obj = await Person.findOne({ _id: id });
  obj ? res.send(obj) : res.status(404).send();
});


async function dataBaseFile(){
  const database = JSON.parse(await fs.readFile("db.json", "utf-8"));
  return database;
}
personRouter.delete("/:id", async (request, res) => {
  const id = Number(request.params.id);
  const response = await Person.deleteOne({ _id: id });
  if (response.deletedCount === 0) {
    res.send("delete was not succesful");
  }
  res.end();
});




personRouter.post("/", async (request, response) => {
  const newPerson = Object.assign({}, request.body);
  const fileData = await Person.find({});
  newPerson.id = getRandomInt(999);
  try {
    if (newPerson.name) {
      console.log("in");
          if (await isNameExist(newPerson.name, fileData)) {
            console.log("insi");
            console.log(await isNameExist(newPerson.name))
            
            response.status(404).end();
          } else {
            console.log("inside");
            await createNewPerson(newPerson.id,newPerson.name,newPerson.number);
            response.json(newPerson);
          }
        }
  } catch (error) {
    response.json(error);
  }
});




module.exports = personRouter;

async function createNewPerson(id, name, number) {
  const person = new Person({ _id: id, name: name, number: number });
  try {
    await person.save();
    return true;
  } catch (error) {
    return false;
  }
}