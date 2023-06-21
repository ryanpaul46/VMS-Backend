/* eslint-disable linebreak-style */
import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  purposeOfEntry: {
    type: String,
  },
  dateVisited: {
    type: String,
  },
  timeVisited: {
    type: String,
  },
  timeExited: {
    type: String,
  },
  user: String,
});

personSchema.set("toJSON", {
  transform: function (document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

export default Person;
