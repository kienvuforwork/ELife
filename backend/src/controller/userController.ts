const User = require('./../model/UserModel')
import express from "express";
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


export const getUser =async (req:express.Request, res:express.Response) =>{
    let token
    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        
         token = req.headers.authorization.split(' ')[1];
    }

    const decoded = await jwt.verify(token,process.env.TOKEN_SECRET)
    const user = await User.findById(decoded.id)
    return res.status(201).json({
        status:"success",
        data:{
          user
        }

    })


}