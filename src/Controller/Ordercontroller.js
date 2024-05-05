import OrderModel from '../Model/Ordermodel.js'
import asyncWrapper from '../Middleware/async.js'
import { BadRequestError, NotFoundError} from '../Errors/index.js'
import {validationResult} from 'express-validator'
import supplierModel from '../Model/supplierModel.js'
export const createOrder=asyncWrapper(async(req,res,next)=>
{
    const errors=validationResult(req);
    if(!errors.isEmpty())
        {
            next(new BadRequestError(errors.array()[0].msg));
        }
        const {name,supplier,status,unitOfMeasure,Date,quantity,description}=req.body;
        const Supplier=await supplierModel.findById(req.body.supplier)
        if(!Supplier)
            {
                return next(new NotFoundError("Supplier not found"))
            }
            // create a new order
            const neworder= new OrderModel({name,supplier,status,unitOfMeasure,Date,quantity,description})
            const savedorder=await neworder.save();
            res.status(201).json({
                message:"order created successfully",
                data: savedorder
            });
});
export const getOrders=asyncWrapper(async(req, res, next)=>
{
   const Orders=await OrderModel.find(); // populate the supplier details
   res.status(200).json({
    message:"orders retrieved successfully",
    data:Orders
   });

});
export const getOrderById=asyncWrapper(async(req,res,next)=>
{
    const order=await OrderModel.findById(req.params.id)
    if(!order) 
        {
            return (new NotFoundError("Order not found"))
        }
        res.status(200).json({Orders: order})
})
export const UpdateOrder=asyncWrapper(async(req, res, next)=>
{
    const order=await OrderModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!order)
    {
        return next(new NotFoundError("Order not found"))
    }
    res.status(200).json({
        message:"order updated successfully",
        order:order
    })
})
export const DeleteOrder=asyncWrapper(async(req,res,next)=>
{
    const order=await OrderModel.findByIdAndDelete(req.params.id);
    if(!order)
    {
        return next(new NotFoundError("Order not found"))
    }
    res.status(200).json({
        message:"order deleted successfully",
        order:order})
})

