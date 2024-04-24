import ProductRoute from './Productroute.js';
import express from 'express'; 
const router = express.Router();
router.use('/products', ProductRoute);
export default router;