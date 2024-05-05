import SupplierModel from "../Model/supplierModel.js";
import {validationResult} from "express-validator"
import{BadRequestError,NotFoundError} from "../Errors/index.js"
import asyncWrapper from "../Middleware/async.js";

export const Addsupplier=asyncWrapper(async(req,res,next)=>
{
    const errors=validationResult(req);
    if(!errors.isEmpty())
        {
            return next(new BadRequestError(errors.array()[0].msg));
        }
        const addsupplier=await SupplierModel.create(req.body);
        res.status(201).json({success: true,data: addsupplier,message:"supplier created successfully"});

});

export const getSuppliers=asyncWrapper(async(req,res,next)=>
{
    const allSupplier= await SupplierModel.find();
    res.status(200).json({Suppliers: allSupplier})
})
export const UpdateSuppliers=asyncWrapper(async(req,res,next)=>
    {
const supplier= await SupplierModel.findByIdAndUpdate(req.params.id)
res.status(200).json({supplier: supplier})
    })
export const getSupplierbyID = asyncWrapper(async(req,res,next)=>
{
    const supplier= await SupplierModel.findById(req.params.id)
    res.status(200).json({supplier})
})
export const DeleteSupplier=asyncWrapper(async(req,res,next)=>{
    const deletedsupplier= await SupplierModel.findByIdAndDelete(req.params.id)
    if(!deletedsupplier)
        {
            return next(new NotFoundError("Supplier not found"))
        }
        res.status(200).json({data:deletedsupplier,message:"Supplier deleted"})
        
})