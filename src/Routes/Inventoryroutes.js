import express  from 'express';
const route= express.Router()
import{AllInventory,Update_Stock,DeleteInventory,GetInventorybyID} from '../Controller/InventoryController.js'
route.patch('/addInventory/:name',Update_Stock)
route.get('/listAvailableProduct',AllInventory)
route.delete('/DeleteInventory/:id',DeleteInventory)
route.get('/getInventory/:id',GetInventorybyID)

export default route;


