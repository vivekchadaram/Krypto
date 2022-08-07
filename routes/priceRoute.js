import express from "express";
import { Currentprice } from "../controller/controller.js";
const priceRouter = express.Router()

priceRouter.use(express.json());

priceRouter.route('/')
.get(Currentprice)

export default priceRouter;