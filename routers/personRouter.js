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
  const response = await Person.collection.deleteOne({ _id: id });
  if (response.deletedCount === 0) {
    return next({status:400,mesage:"delete was not succesful"});
  }
  res.end();
});




personRouter.post("/", async (request, response,next) => {
  const newPerson = Object.assign({}, request.body);
  const fileData = await Person.find({});
  newPerson.id = getRandomInt(999);
  try {
    if (newPerson.name) {
      console.log(isNameExist(newPerson.name, fileData))
          // if (isNameExist(newPerson.name, fileData)) {
          //   console.log("yyyy")
          //   return next({ status: 404, error: "name already exists in database" });
            
          // } else {
            await createNewPerson(newPerson.id,newPerson.name,newPerson.number);
            response.json(newPerson);
          // }
        }
  } catch (error) {
    next({ status: 409, message: { error: err._message } });
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


personRouter.put("/", async (req, res, next) => {
  const obj = Object.assign({}, req.body);
  //const personName = await Person.find({ name: obj.name });
console.log(obj);
  try {
    await updatePersonNumber(obj.name, obj.number);
    res.send("Person number updated succesfully");
  } catch (err) {
    next({ status: 502, message: { error: "could not succed" } });
  }
});

async function updatePersonNumber(_name, _number) {
  await Person.updateOne({ name: _name }, { number: _number });
}

