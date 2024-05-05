import mongoose from "mongoose";

const schema = mongoose.Schema;

const SupplierSchema = new schema(
  {
name:
{
    type:String,
    required:true,
},
contact:
{
type:String,
required:true,
},
address:
{
    type:String,
    required:true,
}

  });
  const SupplierModel=mongoose.model('supplier',SupplierSchema)//populate the supplier details
  export default SupplierModel;