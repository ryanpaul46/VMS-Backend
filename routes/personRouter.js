/* eslint-disable linebreak-style */
import express from "express";
import personController from "../controllers/personController.js";

const personRouter = express.Router();

personRouter.get("/", personController.getPersons);
personRouter.get("/:id", personController.getPerson);
personRouter.get(
  "/firstName/:firstName",
  personController.getPersonByFirstName
);
personRouter.get("/lastName/:lastName", personController.getPersonByLastName);

personRouter.get("/date/:dateVisited", personController.getPersonsByDate);
personRouter.get(
  "/purpose/:purposeOfEntry",
  personController.getPersonsByPurpose
);
personRouter.post("/", personController.createPerson);

personRouter.post("/exit/:id", personController.exitPerson);

export default personRouter;
