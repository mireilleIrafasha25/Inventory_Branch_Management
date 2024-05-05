import {createOrder,getOrderById,getOrders,UpdateOrder,DeleteOrder} from "../Controller/Ordercontroller.js";

import express from "express";

const router = express.Router();

router.post("/addorder", createOrder);
router.get("/ListOrders", getOrders);
router.get("/getById/:id", getOrderById);
router.put("/Update_Order/:id", UpdateOrder)
router.delete("/DeleteOrder/:id", DeleteOrder);
export default router;