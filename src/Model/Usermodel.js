import  mongoose from 'mongoose';
const schema=mongoose.Schema
const Userschema= new schema(
    {
        name:{
            type:String,
            required:true,
            unique:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        otp: {
            type: Number,
            required: false,
        },
        otpExpires: {
            type: Date,
            required: false,
        },
        verified: {
            type: Boolean,
            required: true,
            default: false
        }

    }
)
const UserModel=mongoose.model('User',Userschema)
export default UserModel