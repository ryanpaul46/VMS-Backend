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
const updateUser = async (req, res, next) => {
  try {
    const { id_2 } = req.params;
    const { password, ...updateData } = req.body; // Exclude password from updateData

    if (password) {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      updateData.passwordHash = passwordHash; // Add hashed password to updateData
    }

    const user = await User.findOneAndUpdate({ id_2 }, updateData, {
      new: true,
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: `Cannot find user with id_2 ${id_2}` });
    }

    const decodedToken = jwt.verify(getTokenFrom(req), config.SECRET);
    const admin = await Admin.findById(decodedToken.id);

    const updatedUser = await User.findById(user._id);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    const decodedToken = jwt.verify(getTokenFrom(req), config.SECRET);

    const admin = await Admin.findById(decodedToken.id);
    if (!user) {
      return res
        .status(400)
        .json({ message: `Cannot find user with id ${id}` });
    }
    return res
      .status(200)
      .json({ message: `Successfully delete ${user.name}` });
  } catch (error) {
    next(error);
  }
};

export default {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
