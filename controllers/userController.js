/* eslint-disable linebreak-style */
import bcrypt from "bcrypt";
import User from "../models/User.js";

async function getUsers(_req, res) {
  const users = await User.find({}).populate("persons");

  return res.status(200).json(users);
}

async function createUser(req, res) {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  return res.status(201).json(savedUser);
}

export default {
  createUser,
  getUsers,
};
