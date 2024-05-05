import {Addsupplier,getSupplierbyID,getSuppliers,DeleteSupplier,UpdateSuppliers} from '../Controller/SupplierController.js';
import express from 'express';
const routes=express.Router();
routes.post('/Create',Addsupplier);
routes.get('/ListSuppliers',getSuppliers);
routes.get('/getSupplierById/:id',getSupplierbyID);
routes.put('/UpdateSupplier/:id',UpdateSuppliers);
routes.delete('/DeleteSupplier/:id',DeleteSupplier);
export default routes;