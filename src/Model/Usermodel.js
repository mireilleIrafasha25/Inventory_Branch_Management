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
        }
    }
)
const UserModel=mongoose.model('User',Userschema)
export default UserModel