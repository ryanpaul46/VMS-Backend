/* eslint-disable linebreak-style */
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import getTokenFrom from "../utils/getTokenFrom.js";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";

async function getUsers(_req, res) {
  const users = await User.find({});

  return res.status(200).json(users);
}

async function createUser(req, res, next) {
  try {
    const { username, name, password, role } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const decodedToken = jwt.verify(getTokenFrom(req), config.SECRET);

    const admin = await Admin.findById(decodedToken.id);

    const user = new User({
      username,
      name,
      passwordHash,
      role,
      admin: admin._id,
    });
    const savedUser = await user.save();
    admin.users = admin.users.concat(savedUser._id);
    await admin.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
}

export default {
  createUser,
  getUsers,
};
