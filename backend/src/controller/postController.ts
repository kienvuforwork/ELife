import express from "express";
const Post = require("./../model/postModel")
const User = require('./../model/UserModel')
const AppError = require("./../ErrorHandler/appError")
import { catchAsync } from "./../ErrorHandler/catchAsync";
const Track = require("../model/trackModel")
const TvShow = require("../model/tvShowModel")

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
    const username = req.params.username
    let user
    try{
         user = await User.find({username: username}).then((res: any) => res )
    }catch(e){
        return next(new AppError(`no user eixt`, 404))
    }

    const posts = await Post.find({ username:username });
    const postWithData =await Promise.all(posts.map(async(post:typeof Post) => {
        let data
        if(post.type === "track"){
            data = await Track.findById(post.track)
        }else if (post.type==="tvShow"){
            data = await TvShow.findById(post.tvShow)
        }

       return {...post._doc, data}
    }))
   
    return res.status(201).json({
        message:'success',
       postWithData
    })
})