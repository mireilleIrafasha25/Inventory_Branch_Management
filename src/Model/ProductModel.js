import mongoose from "mongoose";
const schema= mongoose.Schema
const Productschema=new schema(
    {
        name:{
            type:String,
            required:false
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