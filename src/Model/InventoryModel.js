import mongoose from 'mongoose';
const schema=mongoose.Schema;

const InventorySchema= new schema(
    {
        name:
        {
            type:String,
            required:true,
            unique:true,
        },
        supplyDate:
        {
    type:Date,
    required:true,
        },
        stock_Quantity:
        {
            type:Number,
            required:true,
        },
        unitOfMeasure:
        {
            type:String,
            required:true,
            enum:
            {
                values:["kg","g","ml","l","pcs"],
                message:"Unit of measure must be kg,g,ml,l or pcs"
            }
        },

    })
    const InventoryModel=mongoose.model("Inventory",InventorySchema)
    export default InventoryModel;