/* eslint-disable linebreak-style */
import express from "express";
import loginController from "../controllers/loginController.js";

const loginRouter = express.Router();

loginRouter.post("/user", loginController.login);
loginRouter.post("/admin", loginController.adminlogin);

export default loginRouter;
