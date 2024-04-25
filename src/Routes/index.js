import ProductRoute from './Productroute.js';
import Inventorylevel from "./Inventoryroutes.js"
import express from 'express'; 
const router = express.Router();
router.use('/products', ProductRoute);
router.use('/inventory',Inventorylevel);

export default router;