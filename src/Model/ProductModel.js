import mongoose from "mongoose";
const schema= mongoose.Schema
const Productschema=new schema(
    {
    name:{
            type:String,
            required:true,
            unique:true,
        },
    description:{
            type:String,
            required:true
    },
    quantity:
    {
        type:Number,
        required:true
    },
    category:
    {
        type:String,
        required:true
    },
    sku: { 
        type: String, 
        unique: true, 
        required: true },
    price:
    {
            type:Number,
            required:true
    }
    
    }
)
const ProductModel=mongoose.model("Product",Productschema)
export default ProductModel;