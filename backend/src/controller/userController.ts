const User = require('./../model/UserModel')
import express from "express";
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Track = require("./../model/trackModel")
const multer = require('multer')
const AppError = require('./../ErrorHandler/appError')
import { catchAsync } from "./../ErrorHandler/catchAsync";
dotenv.config();
const multerStorage = multer.diskStorage({
  destination: (req: express.Request, file:any, cb:any) => {
    if(req.body.type.includes("track")){
      cb(null,'public/img/tracks' )
    }else if(req.body.type.includes("tvShow")){
      cb(null,'public/img/tvShows' )
    }
 
  },
  filename: (req: express.Request, file:any, cb:any)=>{
    const ext = file.mimetype.split('/')[1]
    console.log("body", req.body.id)
    if(req.body.type.includes("track")){
      cb(null, `track-${req.body.id}.${ext}`)
    }else if(req.body.type.includes("tvShow")){
      cb(null, `tvShow-${req.body.id}.${ext}`)
    }

  }
})

const multerFilter = (req: express.Request, file:any, cb:any) => {
  console.log(file)    

  if(file.mimetype.startsWith('image')){
    cb(null, true)
  }else{
    cb(new AppError("Not an image!", 400), false)
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
})
export const uploadTrackImage = upload.single("image")



interface RequestWithUser extends express.Request {
  user?: typeof User; // Add the 'user' property
file:any
}


const checkToken =async (req:express.Request) => {
  let token
  if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
}
 else if(!token){
  return false
}
const decoded = await jwt.verify(token,process.env.TOKEN_SECRET)
const user = await User.findById(decoded.id)
  if(user){
    return user
  }
return false
} 

export const getUser =catchAsync(async (req:express.Request, res:express.Response) =>{
  const user = await checkToken(req)
  if(user){
    return res.status(201).json({
      status:"success",
      data:{
        user
      }
  })
  }
 else{
      return res.status(401).json({
        status:"success",
        data:{
          message:"Invalid token"
        }
    })
  }
  })

export const addTrack =catchAsync(async (req:RequestWithUser, res:express.Response) => {
  const user = req.user
  const artists = JSON.parse(req.body.artists).map((item:any) => item.name)
  const {id, name, like, type} = req.body
  console.log(type)
  let updatedUser
  if(type[1] === "listeningTrack"){
   updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $push: { listeningTrack: {vibes:JSON.parse(req.body.vibes),artists, id,name,like,image:`track-${req.body.id}`}} }, 
      { new: true },
    );

  }else if(type[1] === "listenedTrack"){
    updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $push: { listenedTrack: {vibes:JSON.parse(req.body.vibes),artists, id,name,like,image:`track-${req.body.id}`}} }, 
      { new: true },
    );
  }
  return res.status(201).json({
    status:"success",
    data:{
      updatedUser
    }
  })

})


export const TvShow = catchAsync(async (req:RequestWithUser, res:express.Response) => {
  const user = req.user
  console.log(req.body)
  const {id, name, like, type,vote_average, overview, origin_country} = req.body
  let updatedUser
  if(type[1] === "watching"){
   updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $push: {  tvShowWatching: {genre:JSON.parse(req.body.genre), vibes:JSON.parse(req.body.vibes),overview,origin_country:JSON.parse(origin_country)[0], vote_average, id,name,recommend: like,image:`track-${req.body.id}`}} }, 
      { new: true },
    );

  }else if(type[1] === "watched"){
    updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $push: {  tvShowWatched: {vibes:JSON.parse(req.body.vibes),genre:JSON.parse(req.body.genre), id,name,recommend: like,origin_country:JSON.parse(origin_country)[0],overview, vote_average,image:`track-${req.body.id}`}} }, 
      { new: true },
    );
  }
  return res.status(201).json({
    status:"success",
    data:{
      updatedUser
    }
  })

})