import ProductRoute from './Productroute.js';
import Inventorylevel from "./Inventoryroutes.js";
import Userroute from '../Routes/userRoute.js'
import tokenRoute from './authTokenroute.js';
import Sales from './saleRoute.js';
import order from './orderroute.js';
import supplier from '../Routes/supplierRoute.js';
import express from 'express'; 
const router = express.Router();
router.use('/products', ProductRoute);
router.use('/inventory',Inventorylevel);
router.use('/user',Userroute)
router.use('/token',tokenRoute);
router.use('/sales',Sales);
router.use('/order',order)
router.use('/supplier',supplier)

export default router;