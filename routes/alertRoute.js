import mongoose from "mongoose";
import express from "express";
import { deletAlert, getAlerts, createAlert } from "../controller/controller.js";

const alertRouter = express.Router();

alertRouter.use(express.json());

alertRouter.route('/')
.get(getAlerts)
.post(createAlert)
.delete(deletAlert)
export default alertRouter;