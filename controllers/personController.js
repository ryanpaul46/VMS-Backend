/* eslint-disable linebreak-style */
import User from "../models/User.js";
import Person from "../models/Person.js";
import isString from "../utils/isString.js";
import getTokenFrom from "../utils/getTokenFrom.js";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";

async function getPersons(req, res) {
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

async function getPersonByFirstName(req, res, next) {
  try {
    const { firstName } = req.params;
    const person = await Person.find({ firstName });

    if (person) return res.json(person);

    return res.status(404).json({ error: "Person not found" });
  } catch (error) {
    next(error);
  }
}
async function getPersonByLastName(req, res, next) {
  try {
    const { lastName } = req.params;
    const person = await Person.find({ lastName });

    if (person) return res.json(person);

    return res.status(404).json({ error: "Person not found" });
  } catch (error) {
    next(error);
  }
}
async function createPerson(req, res, next) {
  try {
    //1. get the needed data
    const { firstName, lastName, contactNumber, purposeOfEntry } = req.body;
    //2. we decode the token
    const decodedToken = jwt.verify(getTokenFrom(req), config.SECRET);
    //3. we check if the token is valid
    const user = await User.findById(decodedToken.id);
    //4. we convert the date
    const currentDate = new Date();
    const dateVisited = currentDate.toISOString().split("T")[0];
    const timeVisited = currentDate.toLocaleTimeString();
    //5. we create person object
    const person = new Person({
      firstName,
      lastName,
      contactNumber,
      purposeOfEntry,
      dateVisited,
      timeVisited,
      user: user._id,
    });
    //6. we handle missing data
    if (!firstName || !lastName || !contactNumber || !purposeOfEntry) {
      return res.status(400).json({ error: "Content is missing" });
    }

    const personExists = await Person.findOne({ firstName, lastName });
    if (personExists) {
      return res.status(400).json({ error: "Person already exists" });
    }

    const savedPerson = await person.save();

    user.persons = user.persons.concat(savedPerson._id);
    await user.save();

    return res.status(201).json(savedPerson);
  } catch (error) {
    next(error);
  }
}

async function getPersonsByDate(req, res) {
  try {
    const { dateVisited } = req.params;
    const date = new Date(dateVisited);
    const convertedDate = date.toISOString().split("T")[0];

    const persons = await Person.find({ dateVisited: convertedDate });
    res.status(200).json(persons);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}

async function getPersonsByPurpose(req, res) {
  try {
    const { purposeOfEntry } = req.params;

    const persons = await Person.find({
      purposeOfEntry: { $eq: purposeOfEntry },
    });

    res.status(200).json(persons);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}
const updatePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await Person.findByIdAndUpdate(id, req.body);
    if (!person) {
      return res
        .status(400)
        .json({ message: `cannot find person with id ${id}` });
    }
    if (person.timeExited) {
      return res.status(400).json({
        message: `This person have already exited at ${person.timeExited} and cannot be updated`,
      });
    }
    const updatedPerson = await Person.findById(id);
    res.status(200).json(updatedPerson);
  } catch (error) {
    console.log(error);
    res.status(204).json({ message: error.message });
  }
};
const exitPerson = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await Person.findByIdAndUpdate(id, req.body);

    if (!person) {
      return res.status(404).json({ message: `${id} not found` });
    }
    const updatedPerson = await Person.findById(id);
    res.status(200).json(updatedPerson);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
export default {
  getPersons,
  getPerson,
  createPerson,
  getPersonsByDate,
  getPersonsByPurpose,
  getPersonByFirstName,
  getPersonByLastName,
  updatePerson,
  exitPerson,
};
