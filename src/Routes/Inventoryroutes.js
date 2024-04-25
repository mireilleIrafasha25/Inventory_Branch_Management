import express from 'express';
import {Stock_in} from '../Controller/InventoryController.js';
const router = express.Router();
// router.get('/GetCurrentStock',GetInventoryLevel)
//  router.put('/UpdateItem',UpdateInventoryLevel)
//  router.get('/AddnewInventory',AddInventoryLevel)

router.post('/Stock_in',Stock_in)

export default router;

