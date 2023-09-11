
const User = require('./../model/UserModel')
import express from "express";
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

interface RequestWithUser extends express.Request {
    user?: typeof User; // Add the 'user' property
}


const cookieOptions = {
    expire: new Date(
        Date.now() + 1000 *24 *60 *60*90
    ),
    secure: true,
    httpOnly:true
}


const signToken = (id:String) =>{
    return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: 100000})
}

export const register = async(req:express.Request, res:express.Response) =>{
    console.log(req.body)
    try{
        const { email, password, username} = req.body
        if ( !email || !password || !username ){
            return res.sendStatus(400)
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.sendStatus(400)
        }
        const newUser = await User.create({
            email, username, password
        })
        const token = jwt.sign({id:newUser._id}, process.env.TOKEN_SECRET, {expiresIn: "1000d"})
        return res.status(200).cookie('jwt', token, cookieOptions).json({
            status: 'success',
            token,
            data:{newUser}
        })
    } catch(error){
  
        return res.status(400).json({
            status:"fail",
            message: error._message
        })
    }
}

export const login = async ( req:express.Request, res:express.Response, next:express.NextFunction)=>{
    const {username, password} = req.body;
    if(!username || !password) {
        return next()
    }
    const user = await User.findOne({username}).select('+password')
   
    if(!user || !(await user.correctPassword(password, user.password))){
        return res.status(401).json({
            status:'Fail',
            data:{
                message:"Incorrect password or email"
            }
        })
    }
    const token = signToken(user.id)
    try{  res.cookie('jwt', token,  cookieOptions)}catch(E){console.log(E)}
  
    res.status(201).json({
        status:"success",
        token,
        user,
    })
}

export const checkEmail = async ( req:express.Request, res:express.Response, next:express.NextFunction)=>{
    const {email} = req.body
    const user = await User.findOne({email})
    if(user){
        return res.status(401).json({
            status:"fail",
            data:{
                message:"This email is already taken!"
            }
        })

    }
    return res.status(201).json({
        status:"success",
        data:{
            message:"Valid email!"
        }

    })
}


export const protect = async ( req:RequestWithUser, res:express.Response, next:express.NextFunction)=>{
    let token

    if(req.cookies.token){
        token = req.cookies.token
    }
    else if( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){    
         token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({
            status:"fail",
            data:{
                message:"You are not log in!"
            }
    
        })
    }
    const decoded = await jwt.verify(token,process.env.TOKEN_SECRET)
    const user = await User.findById(decoded.id)
    if(!user){
        return res.status(401).json({
            status:"fail",
            data:{
                message:"User no longer exist!"
            }
    
        })
    }
    req.user = user;
   next()
}