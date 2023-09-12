import express from "express";
const Post = require("./../model/postModel")
const AppError = require('./../ErrorHandler/appError')
import { catchAsync } from "./../ErrorHandler/catchAsync";


export const post = catchAsync(async (req:express.Request, res:express.Response) => {
    const data = req.body
    const newPost= await Post.create({data})
    return res.status(201).json({
        status:"sucess",
        data:{
            newPost
        }
    })
})