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
    type: Date,
    default: Date.now,
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
    returnedObject.dateVisited = returnedObject.dateVisited
      .toISOString()
      .split("T")[0];
  },
});

const Person = mongoose.model("Person", personSchema);

export default Person;
