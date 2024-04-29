import mongoose from 'mongoose';
const schema=mongoose.Schema;
// function to update inventory after stock in 


const InventoryLevelSchema= new schema(
    {
        productID:[
        {
       type:mongoose.Schema.Types.ObjectId,
       ref:"Product",
       required:true,
        },],
        quantity:
        {
            type:Number,
            required: false,
        }

    }
)
const  InventoryLevelModel= mongoose.model('Inventory',InventoryLevelSchema);
export default InventoryLevelModel;
