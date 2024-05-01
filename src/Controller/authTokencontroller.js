import {BadRequestError} from '../Errors/index.js'
import TokenModel from '../Model/authTokenModel.js'
import {validationResult} from 'express-validator'
import asyncWrapper from '../Middleware/async.js'

export const addToken=asyncWrapper(async(req, res, next)=>
{
    const errors= validationResult(req);
    {
        if(!errors.isEmpty())
        {
             next(new BadRequestError(errors.array()[0].msg))
        }
    }
    const newToken=await TokenModel.create(req.body)
    res.status(201).json({newToken})
}
);
export const FindbyUser=asyncWrapper(async(req, res, next)=>
{
const tokenOwner = req.query.user;
const Foundtoken = await TokenModel.findOne({status:tokenOwner})
return res.status(200).json({Foundtoken})
})
export const deleteToken = asyncWrapper(async(req, res, next)=>
{
    const tokenOwner = req.query.user;
    const Foundtoken = await TokenModel.findByIdAndDelete(tokenOwner)
    return res.status(200).json({message:"Token deleted"})
})