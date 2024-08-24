import express from "express";
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder} from "../Controllers/OrderController.js";
import authMiddleware from '../Middleware/auth.js'

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",authMiddleware,verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);

export default orderRouter;