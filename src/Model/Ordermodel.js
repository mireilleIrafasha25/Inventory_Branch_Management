import mongoose from "mongoose";

const schema = mongoose.Schema;

const OrderSchema = new schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitOfMeasure:
    {
        type: String,
        required: true,
        enum:
        {
            values: ["kg", "g", "ml", "l", "pcs"],
            message: "Unit of measure must be kg, g, ml, l or pcs"
        }
    },
    supplier:
    {
        type: mongoose.Types.ObjectId,
        ref: "Supplier",
        required: true,
    },
    Date:
    {
orderDate:
    {
        type: Date,
        required: false,
    },
    deliveryDate:
    {
        type: Date,
        required: false,
    }

    },
    status:
    {
        type:String,
        required:true,
        enum:
        {
            values:["pending","delivered","cancelled"],
            default:"pending",
            message:"Status must be pending,delivered or cancelled"
        }
    },
  })
  const order=mongoose.model("Order",OrderSchema)
  export default order;