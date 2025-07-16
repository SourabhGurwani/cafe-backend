import express from "express";
import { newOrder,showOrders } from "../controllers/orderController.js";
const Router = express.Router();

Router.post("/", newOrder);
Router.get("/:id", showOrders);


export default Router;