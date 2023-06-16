/* eslint-disable linebreak-style */
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  persons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model("User", userSchema);

export default User;