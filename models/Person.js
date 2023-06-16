/* eslint-disable linebreak-style */
import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlenght: 3,
    required: true,
  },
  number: {
    type: String,
    minlenght: 8,
    required: true,
  },
  user: String,
});

personSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;

    return returnedObject;
  }
});

const Person = mongoose.model("Person", personSchema);

export default Person;