import UserModel from "../Model/Usermodel.js";
import asyncWrapper from "../Middleware/async.js";
import { otpGenerator } from "../Utils/otp.js";
import {UnauthorizedError} from '../Errors/Unauthorized.js'
import {BadRequestError,NotFoundError} from "../Errors/index.js";
import {validationResult} from 'express-validator';
import {sendEmail} from '../Utils/sendEmail.js'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";
import Token from "../Model/authTokenModel.js"

export const SignUp=asyncWrapper(async(req,res,next)=>
{
// validation
    const errors= validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors.array());
         next(new BadRequestError(errors.array()[0].msg))
    }
    // checking  if user is alreeady in using the email
    const FounderUser=await UserModel.findOne({email:req.body.email})
    if(FounderUser)
    {
        return next(new BadRequestError("Email is already in using this email"))
    };
    //harshing the user Password
    const hashedPassword = await bcryptjs.hashSync(req.body.password,10);
    //Generating otp generator
    const otp=otpGenerator();
    const otpExpirationDate= new Date().getTime()+(60*1000*5);
    //Recording the user to the database
    const newUser= new UserModel({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        otp: otp,
        otpExpires:otpExpirationDate,
    });
    const savedUser= await newUser.save();
    // console.log(savedUser);
 await sendEmail(req.body.email,"Verify your account",`Your OTP is ${otp}`)
 if(savedUser)
 {
    return res.status(201).json({
        message:"User account created!",
        user:savedUser
    })
 }
});
export const Validateopt=asyncWrapper(async(req,res,next)=>
{
    //validation 
    const errors=  validationResult(req);
    if(!errors.isEmpty())
    {
        return next(new BadRequestError(errors.array()[0].msg))
    }
    // checking if given opt is stored in our database
    const FounderUser=await UserModel.findOne({otp:req.body.otp})
    if(!FounderUser)
    {
        next(new UnauthorizedError('Authorization denied'));
    };
    // checking if otp is expired or not
    if(FounderUser.otp.expires < new Date().getTime())
    {
        next(new UnauthorizedError('OTP expired'));
    }
    // Update the user to 
    FounderUser.verified = true;
    const savedUser = await FounderUser.save();
    if(savedUser)
    {
        return res.status(200).json({
            message:"User account verified!",
            user:savedUser
        })
    }

});
export const SignIn=asyncWrapper(async(req,res,next)=>
{
    //validation 
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return next(new BadRequestError(errors.array()[0].msg))
    }
    //find User
    const FoundUser=await UserModel.findOne({email:req.body.email})
    if(!FoundUser)
    {
        return next(new BadRequestError('Invalid Email or password'))

    };
    //check account verification
    if(!FoundUser)
    {
        return next(new BadRequestError('Account is not verified'))
    }
    //Verify password
    const isPasswordVerified= await bcryptjs.compareSync(req.body.password,FoundUser.password)
    if(!isPasswordVerified)
    {
        return next(new BadRequestError('Invalid Email or password'))
    }
    //Generate token
    const token = jwt.sign({id:FoundUser.id,email:FoundUser.email},process.env.JWT_SECRET_KEY, {expiresIn:'1h'});

    res.status(200).json({
        message:"User account verified!",
        user:FoundUser,
        token:token
    });
});

export const ForgotPassword=asyncWrapper(async(req,res,next)=>
{
    //validation 
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return next(new BadRequestError(errors.array()[0].msg))
    }
    //find User
    const FoundUser=await UserModel.findOne({email:req.body.email})
    if(!FoundUser)
    {
        return next(new BadRequestError('Invalid Email or password'))
    }
    //Generate token
    const token=jwt.sign({id:FoundUser.id},process.env.JWT_SECRET_KEY,{expiresIn:"15m"})
    //Recording the token to the database
    await Token.create({
        token:token,
        user:FoundUser._id,
        expirationDate:new Date().getTime()+ (60*1000*5),
    });
    const link=`http://localhost:8080/reset-password?token=${token}&id=${FoundUser.id}`;
    const emailBody=`click on the link below  to reset your password \n\n${link}`;
    await sendEmail(req.body.email,"Reset your password",emailBody);

    res.status(200).json({
        message:"we sent you a reset password link on yourn email"
    });
});

export const ResetPassword = asyncWrapper(async (req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    };
    // Verify token
    const decoded = await jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
        return next(new BadRequestError("Invalid token!"));
    }
    const recordedToken = await Token.findOne({ token: req.body.token });
    if (decoded.id!= req.body.id || recordedToken.user!= req.body.id) {
        return next(new BadRequestError("Invalid token!"));
    }
    if (new Date(recordedToken.expirationDate).getTime() < new Date().getTime()) {
        return next(new BadRequestError("Token expired!"));
    }
    // Find user
    const foundUser = await UserModel.findById(req.body.id);
    if (!foundUser) {
        return next(new BadRequestError("User not found!"));
    };
    // Deleting the user token
    await Token.deleteOne({ token: req.body.token });
    // Harshing the user password
    const inputedPassword = await bcryptjs.hashSync(req.body.password, 10);
    // Updating the user password
    foundUser.password = inputedPassword;
    const savedUser = await foundUser.save();
    if (savedUser) {
        return res.status(200).json({
            message: "Your password has been reset!",
        })
    }
   });


