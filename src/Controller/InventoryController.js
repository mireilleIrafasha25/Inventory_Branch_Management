
import asyncWrapper from "../Middleware/async.js";
import { NotFoundError,BadRequestError } from "../Errors/index.js";
import {validationResult} from 'express-validator'
import InventoryLevelModel from "../Model/InventoryModel.js";
//import Update_stock_In from "../Utils/heiperfunction.js";
export const Stock_in=asyncWrapper(async(req,res,next)=>
{
    const {productID,quantity}=req.body;
    // Validate the request payload
    if(!productID || !quantity || quantity<=0) 
    {
   return next(new BadRequestError("Invalid request ,please provide a valid productID and a positive quantity"))     
}
InventoryLevelModel.Update_stock_In(productID, quantity)
.then(()=>
{
    res.status(200).json({message:"Stock added successfully"})
})
.catch((err)=>
{
    res.status(500).json({message:"Internal Server Error"})
})
})

// export const AddInventoryLevel=asyncWrapper(async(req,res,next)=>
// {
//     const errors= validationResult(req);
//     if(!errors.isEmpty())
//     {
//         console.log(errors.array());
//         return next(new BadRequestError(errors.array()[0]))
//     }
//     const newInventoryLevel=await InventoryLevelModel.create(req.body);
//     res.status(201).json({newInventoryLevel})
// })

// Get current inventory Level of  a Product
// export const GetInventoryLevel=asyncWrapper(async(req,res,next)=>
// {
//     const errors= validationResult(req)
//     if(errors.isEmpty())
//     {
//         return next(errors.array())
//     }
//     const ProductId=req.query.id
//     const InventoryLevel=await InventoryLevelModel.findOne({product:ProductId})
//     if(!InventoryLevel)
//     {
//         return next(new NotFoundError("Product not found"))
//     }
//     return res.status(200).json({InventoryLevel})

// })

// Update inventory level for a product (when new stock arrives or items are sold)

// export const UpdateInventoryLevel=asyncWrapper(async(req,res,next)=>
// {
//    const ProductID=req.query.id
//     const quantity= req.body
//     let inventoryLevel=await InventoryLevelModel.findOne(ProductID)
//     if(!inventoryLevel)
//     {
//         inventoryLevel = new InventoryLevelModel(ProductID)
//     }
//     inventoryLevel.quantity=quantity
//     await inventoryLevel.save()
// })

// export const ListItem=asyncWrapper(async(req,res,next)=>
// {
//     const Item=await InventoryModel.find()
//     return res.status(200).json({Item})
// })
// export const GetItembyID=asyncWrapper(async(req,res,next)=>
// {
//     const Item=await InventoryModel.findById(req.query.item)
//     if(!Item)
//     {
//         return next(new NotFoundError("Item not found"))
//     } 
//     res.status(200).json({Item})
 
// })

// export const DeleteItem=asyncWrapper(async(req,res,next)=>
// {
// const Item=await InventoryModel.findByIdAndDelete(req.query.id)
// if(!Item)
// {
//     return next(new NotFoundError("Item not found"))
// }
// })