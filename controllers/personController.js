/* eslint-disable linebreak-style */
import User from "../models/User.js";
import Person from "../models/Person.js";
import isString from "../utils/isString.js";
import getTokenFrom from "../utils/getTokenFrom.js";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";

async function getPersons(_, res) {
  const persons = await Person.find({});

  return res.json(persons);
}

async function getPerson(req, res, next) {
  try {
    const { id } = req.params;
    const person = await Person.findById(id);

    if (person) return res.json(person);

    return res.status(404).json({ error: "Person not found" });
  } catch (error) {
    next(error);
  }
}

async function createPerson(req, res) {
  const { name, number } = req.body;
  const decodedToken = jwt.verify(getTokenFrom(req), config.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: "Token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const person = new Person({
    name,
    number,
    user: user._id,
  });

  const savedPerson = await person.save();

  user.persons = user.persons.concat(savedPerson._id);
  await user.save();

  return res.status(201).json(savedPerson);
}

async function updatePerson(req, res, next) {
  const id = req.params.id;
  const { name, number } = req.body;

  if (name === undefined || number === undefined)
    return res.status(400).json({ error: "Content is missing" });

  if (name === "" || number === "")
    return res.status(400).json({ error: "Name and number are required" });

  if (!isString(name) || !isString(number))
    return res.status(400).json({ error: "Name and number must be strings" });

  const person = {
    name,
    number,
  };

  try {
    const updatedPerson = await Person.findByIdAndUpdate(id, person, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (updatedPerson) return res.json(updatedPerson);

    return res.status(404).json({ error: "Person not found" });
  } catch (error) {
    next(error);
  }
}

async function deletePerson(req, res, next) {
  try {
    const id = req.params.id;
    await Person.findByIdAndDelete(id);

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export default {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
};
