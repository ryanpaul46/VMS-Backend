/* eslint-disable linebreak-style */
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

async function getAdmin(_req, res) {
  const admin = await Admin.find({}).populate("users");

  return res.status(200).json(admin);
}

async function createAdmin(req, res) {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const admin = new Admin({
    username,
    name,
    passwordHash,
  });

  const savedAdmin = await admin.save();

  return res.status(201).json(savedAdmin);
}

export default {
  createAdmin,
  getAdmin,
};
