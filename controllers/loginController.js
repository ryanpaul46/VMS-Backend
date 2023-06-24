/* eslint-disable linebreak-style */
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import config from "../utils/config.js";
import Admin from "../models/Admin.js";

async function login(req, res) {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
}

async function adminlogin(req, res) {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  const passwordCorrect =
    admin === null ? false : await bcrypt.compare(password, admin.passwordHash);

  if (!(admin && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const adminForToken = {
    username: admin.username,
    id: admin._id,
  };

  const token = jwt.sign(adminForToken, config.SECRET);

  res.status(200).send({ token, username: admin.username, name: admin.name });
}

export default {
  login,
  adminlogin,
};
