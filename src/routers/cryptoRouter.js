import cryptoController from "../controllers/cryptoController.js";
import express from "express";

const cryptoRouter = express.Router();

cryptoRouter.get("/getPrices", cryptoController.getPrices);

export default cryptoRouter;