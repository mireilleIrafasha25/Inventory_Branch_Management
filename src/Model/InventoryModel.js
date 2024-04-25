import mongoose from 'mongoose';
const schema=mongoose.Schema;
// function to update inventory after stock in 
export const Update_stock_In=(productID,quantity)=>
{
    return new Promise((resolve,reject)=>
{
    //retrieve current inventory for product.
    InventoryLevelModel.findOne({productID})
    .then((product)=>
{
    if(!product)
    {
        //Product not found create new entry 
        return InventoryLevelModel.create({productID, quantity})
    }
    else{
        //Product found ,update quantity
        product.quantity+=quantity
        return product.save();
    }
})
.then(()=>{resolve();})
.catch((err)=>{reject(err);});
})
};

const InventoryLevelSchema= new schema(
    {
        product:[
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
