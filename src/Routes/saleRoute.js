import {ListAllsale,OutflowOperation,DeleteSale,CreateNewSale} from '../Controller/salesController.js';
import express from 'express';
const route= express.Router();
route.patch("/Update/:name",OutflowOperation)
route.get("/listSales",ListAllsale)
route.delete("/Deletesale/:id",DeleteSale)
route.post("/createSales",CreateNewSale)
export default route;
