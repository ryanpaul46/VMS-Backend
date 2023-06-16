/* eslint-disable linebreak-style */
import express from "express";
import adminController from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/", adminController.getAdmin);
adminRouter.post("/", adminController.createAdmin);

export default adminRouter;