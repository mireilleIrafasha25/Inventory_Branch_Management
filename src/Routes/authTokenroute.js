import express from 'express';
const tokenRouter= express.Router();
import {FindbyUser,addToken,deleteToken} from '../Controller/authTokencontroller.js'

tokenRouter.post('/CreateToken', addToken)
tokenRouter.get('/findbyUser',FindbyUser)
tokenRouter.delete('/deleteToken',deleteToken)

export default tokenRouter;