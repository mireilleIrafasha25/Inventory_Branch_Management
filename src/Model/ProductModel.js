import mongoose from "mongoose";
const schema= mongoose.Schema
const Productschema=new schema(
    {
        name:{
            type:String,
            required:true,
            unique:true,
        },
        price:{
            type:Number,
            required:true
        },
        description:{
            type:String,
            required:true
    }
    }
)
const ProductModel=mongoose.model("Product",Productschema)
export default ProductModel;