/* eslint-disable linebreak-style */
import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/", userController.createUser);
userRouter.put("/:id_2", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
