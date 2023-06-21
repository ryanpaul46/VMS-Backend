/* eslint-disable linebreak-style */
import express from "express";
import personController from "../controllers/personController.js";

const personRouter = express.Router();

personRouter.get("/", personController.getPersons);
personRouter.get("/:id", personController.getPerson);
personRouter.post("/", personController.createPerson);
personRouter.put("/:id", personController.exitPerson);
// personRouter.get("/:dateVisited", personController.getPersonsByDate);
// personRouter.get("/:purposeOfEntry", personController.getPersonsByPurpose);

export default personRouter;
