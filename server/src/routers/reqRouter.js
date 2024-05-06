import cryptoController from "../controllers/reqController.js";
import express from "express";

const reqController = express.Router();

reqController.get("/getPrices", cryptoController.getPrices);

export default reqController;