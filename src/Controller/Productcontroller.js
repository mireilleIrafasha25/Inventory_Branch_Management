import ProductModel from "../Model/ProductModel.js";
import asyncWrapper from "../Middleware/async.js";
import {validationResult} from 'express-validator'
import { NotFoundError,BadRequestError } from "../Errors/index.js";
export const Addproduct=asyncWrapper(async(req,res,next)=>
{
    const errors= validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors.array());
         next(new BadRequestError(errors.array()[0]))
    }
    const newproduct=await ProductModel.create(req.body)
   res.status(201).json({newproduct})
    }
);
export const GetAllProduct = asyncWrapper(async(req, res,next)=>
{
    const products=await ProductModel.find();
    res.status(200).json({ products:products})
}) 
export const GetProductbyID=asyncWrapper(async(req, res, next)=>
{
    const product=await ProductModel.findById(req.params.id);
    if(!product)
    {
        return next(new NotFoundError("Product not found"));
    }
    res.status(200).json({product:product})
})
export const UpdateProduct= asyncWrapper(async(req,res,next)=>
{
    const product=await ProductModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!product)
    {
        return next(new NotFoundError("Product not found"))
    }
    res.status(200).json({product:product})
})
export const DeleteProduct=asyncWrapper(async(req,res,next) => {
    const product=await ProductModel.findByIdAndDelete(req.params.id);
    if(!product)
    {
        return next(new NotFoundError("Product not found"))
    }
    res.status(200).json({product:product})
})
