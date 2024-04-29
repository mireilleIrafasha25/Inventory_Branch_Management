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