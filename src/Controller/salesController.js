import OutflowModel from "../Model/SalesModel.js";
import  stockModel from "../Model/InventoryModel.js"
import { NotFoundError,BadRequestError } from "../Errors/index.js";
import { validationResult } from "express-validator";

import asyncWrapper from "../Middleware/async.js";

export const CreateNewSale=asyncWrapper(async(req, res, next)=>
{
    const {name,stock_Quantity,unitOfMeasure,outflowDate}=req.body;
    //Set supplyDate to the currentDate if not provided in the request body
    const currentDate=new Date().toLocaleDateString();
    //create new outflow record
    const newOutflow = await OutflowModel.create({
        name:name,
        stock_Quantity:stock_Quantity,
        unitOfMeasure:unitOfMeasure,
        outflowDate:currentDate
    });
    const savedOutFlow=await newOutflow.save();

    res.status(201).json({
        message:'outFlow created successfully',
        data:savedOutFlow
    });
});

export const OutflowOperation=asyncWrapper(async(req,res,next)=>
    {const errors = validationResult(req);
        if(!errors.isEmpty()){
            return next(new BadRequestError(errors.array()[0].msg));
        }
            const { name, stock_Quantity, unitOfMeasure, OutflowDate } = req.body;
    
            // Find stock record by product name
            let existingStock = await stockModel.findOne({ name });
    
            if (!existingStock) {
                // If the stock record doesn't exist, return an error
                return  next (new NotFoundError('Stock not found' ));
            }
            // Reduce the quantity of the existing stock
            existingStock.stock_Quantity -= stock_Quantity;
            await existingStock.save();
    
            // Create a new Outflow record
            const newOutflow = new OutflowModel({ name, stock_Quantity, unitOfMeasure, OutflowDate });
            const savedOutflow = await newOutflow.save();
    
            res.status(201).json({
                message: 'Outflow (sale) created successfully',
                data: savedOutflow
            });
            
        });
        

    export const ListAllsale=asyncWrapper(async(req, res,next)=>
    {
        const outflows=await OutflowModel.find();
        res.status(200).json({ outflows:outflows})
    });
    export const DeleteSale=asyncWrapper(async(req, res,next)=>
        {
 
            const outflow=await OutflowModel.findByIdAndDelete(req.params.id);
            if(!outflow)
                {
                    return next(new NotFoundError("Outflow not found"))
                
                }
                res.status(200).json({outflow:outflow})
        })


