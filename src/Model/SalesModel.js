import mongoose from 'mongoose';
const schema= mongoose.Schema

const OutflowSchema= new schema(
    {
        name:
        {
            type:String,
            required: true,
        },
        outflowDate:
        {
            type:Date,
            required:false,
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
        },
    }
})

const OutflowModel=mongoose.model("Outflow",OutflowSchema)
export default OutflowModel;