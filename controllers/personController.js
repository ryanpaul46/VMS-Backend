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
async function createPerson(req, res) {
  const { firstName, lastName, contactNumber, purposeOfEntry } = req.body;

  const decodedToken = jwt.verify(getTokenFrom(req), config.SECRET);

  if (!decodedToken) {
    return res.status(400).json({ error: "Token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const currentDate = new Date();
  const dateVisited = currentDate.toISOString().split("T")[0];
  const timeVisited = currentDate.toLocaleTimeString();

  const person = new Person({
    firstName,
    lastName,
    contactNumber,
    purposeOfEntry,
    dateVisited,
    timeVisited,
    user: user._id,
  });

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
}
// async function getPersonsByDate(req, res) {
//   try {
//     const { dateVisited } = req.params;

//     const persons = await Person.find({ dateVisited: { $eq: dateVisited } });

//     res.status(200).json(persons);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message });
//   }
// }
// async function getPersonsByPurpose(req, res) {
//   try {
//     const { purposeOfEntry } = req.params;

//     const persons = await Person.find({
//       purposeOfEntry: { $eq: purposeOfEntry },
//     });

//     res.status(200).json(persons);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message });
//   }
// }

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
  exitPerson,
  // getPersonsByDate,
  // getPersonsByPurpose,
};
