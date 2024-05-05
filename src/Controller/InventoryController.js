import InventoryModel from "../Model/InventoryModel.js";

import asyncWrapper from "../Middleware/async.js";

import { NotFoundError,BadRequestError } from "../Errors/index.js";

import {validationResult} from 'express-validator'

export const Update_Stock= asyncWrapper(async(req,res,next)=>
{
    const errors=validationResult(req);
        
            if(!errors.isEmpty())
            {
                next(new BadRequestError(errors.array()[0].msg))
            }
        const {name,stock_Quantity,unitOfMeasure}=req.body;
        //set supply Date to the current date if not provided in the requested body
        const currentDate=new Date().toLocaleDateString();

        const existingStock=await InventoryModel.findOne({name:name})
        if(existingStock)
            {
                //Update the existing stock quantity
                existingStock.stock_Quantity += stock_Quantity;
                await existingStock.save();
                res.status(200).json({
        message:"Stock quantity updated successfully" ,
        data:existingStock                   

                });
            }
            else{
                //create new stock record
                const newStock=await InventoryModel.create(
                    {
                    name:name,
                    stock_Quantity:stock_Quantity,
                    unitOfMeasure:unitOfMeasure,
                    supplyDate:currentDate
                    }
                );
                res.status(201).json({
                    message:"New stock record created successfully",
                    data:newStock
                });
            }
});
export const AllInventory=asyncWrapper(async(req, res, next)=>
{
    const inventory=await InventoryModel.find();
    res.status(200).json({ inventory:inventory})
});
export const DeleteInventory=asyncWrapper(async(req, res, next)=>{

    const inventory=await InventoryModel.findByIdAndDelete(req.params.id);
    if(!inventory)
    {
        return next(new NotFoundError("Inventory not found"));
    }
    res.status(200).json({inventory:inventory})
})

export const GetInventorybyID=asyncWrapper(async(req, res, next)=>
{
    const inventory=await InventoryModel.findById(req.params.id);
    if(!inventory)
    {
        return next(new NotFoundError("Inventory not found"));
    }
    res.status(200).json({inventory:inventory})
})
