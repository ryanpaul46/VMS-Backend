/* eslint-disable linebreak-style */
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const adminSchema = mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

adminSchema.plugin(uniqueValidator);

adminSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;