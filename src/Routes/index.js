import ProductRoute from './Productroute.js';
import Inventorylevel from "./Inventoryroutes.js";
import Userroute from '../Routes/userRoute.js'
import tokenRoute from './authTokenroute.js';
import express from 'express'; 
const router = express.Router();
router.use('/products', ProductRoute);
router.use('/inventory',Inventorylevel);
router.use('/user',Userroute)
router.use('/token',tokenRoute);
export default router;