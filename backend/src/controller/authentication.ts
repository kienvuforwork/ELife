import express from "express";
import { createUser, getUserByEmail } from "../model/user";
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.TOKEN_SECRET);
export const register = async(req:express.Request, res:express.Response) =>{
    try{
        const { email, password, username} = req.body
        if ( !email || !password || !username ){
            return res.sendStatus(400)
        }
        const existingUser = await getUserByEmail(email);
        if(existingUser){
            return res.sendStatus(400)
        }
        const user = await createUser({
            email, username, password
        })
        return res.status(200).json(user).end()
    } catch(error){
        console.log(error)
        return res.sendStatus(400)
    }
}