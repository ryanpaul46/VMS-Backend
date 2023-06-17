/* eslint-disable linebreak-style */
import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  purposeOfEntry: {
    type: String,

    required: true,
  },
  visitorIdNumber: {
    type: String,
    required: true,
  },
  returnedId: {
    type: Boolean,
    default: false,
  },
  dateVisited: {
    type: Date,
    default: Date.now,
  },
  timeVisited: {
    type: String,
    default: function () {
      return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
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
    returnedObject.timeExited = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  },
});

const Person = mongoose.model("Person", personSchema);

export default Person;
