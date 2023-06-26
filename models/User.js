import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  role: {
    type: String,
    enum: ["user", "admin"], // Specify the allowed roles here
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
    unique: true,
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

// Generate unique id_2 value before saving
userSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  const generatedId = Math.random().toString(36).substr(2, 9);
  this.id_2 = generatedId;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
