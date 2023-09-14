import express from "express";
import mongoose from "mongoose";
const Post = require("./../model/postModel")
const User = require('./../model/UserModel')
const AppError = require("./../ErrorHandler/appError")
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

export const getUserPost = catchAsync(async(req:express.Request, res:express.Response, next:express.NextFunction) => {
    const id = req.params.id
    let user
    try{
         user = await User.findById({_id: id}).then((res: any) => res )
    }catch(e){
        return next(new AppError(`no user eixt`, 404))
    }

    const posts = await Post.find({ _id: { $in: user.posts } });
    return res.status(201).json({
        message:'success',
        posts
    })
})