const express = require("express");
const moment = require("moment");
const fs = require("fs/promises");
const { response } = require("express");
const personRouter = express.Router();
const Person = require("../mongodb/mongoPerson");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
async function isNameExist(name) {
  const database = JSON.parse(await fs.readFile("db.json", "utf-8"));

  for (let person of database) {
    if (person.name === name) {
      return true;
    }
  }
  
  return false;
}

personRouter.get("/", async (request, response) => {
  const database = JSON.parse(await fs.readFile("db.json", "utf-8"));
  response.json(database);
   
});

personRouter.get("/:id", async (request, response) => {
  const persons = JSON.parse(await fs.readFile("db.json", "utf-8"));
  
  const id = Number(request.params.id);
  const note = persons.find((person) => person.id === id);
 
  if (note) {
    response.send(note);
  } else {
    response.status(404).end();
  }

});

async function dataBaseFile(){
  const database = JSON.parse(await fs.readFile("db.json", "utf-8"));
  return database;
}
personRouter.delete("/:id", async (req, res) => {
  const fileData = await dataBaseFile();
  const id = Number(req.params.id);
  const index = fileData.findIndex((obj) => obj.id === id);
  
  index || index === 0 ? fileData.splice(index, 1) : a.log("s");
  
  await fs.writeFile("./db.json", JSON.stringify(fileData));
  res.send("user was deleted successfully")
  res.end();
});


personRouter.post("/", async (request, response) => {
  const newPerson = Object.assign({}, request.body);
  newPerson.id = getRandomInt(999);
  try {
    
    
    if (newPerson.name) {
      
          if (await isNameExist(newPerson.name)) {
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