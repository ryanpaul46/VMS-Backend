/* eslint-disable linebreak-style */
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  role: {
    type: String,
    enum: ["user", "admin"], //specify the allowed roles here
  },
  persons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
  ],
  admin: String,
  id_2: {
    type: String,
    default: () => Math.random().toString(36).substr(2, 9), // Generate a random string
  },
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
