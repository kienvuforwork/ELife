import mongoose from "mongoose";
import { Track } from "./trackModel";
import { TvShow } from "./tvShowModel";
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    username: {type:String, required:true},
    email: {type:String , unique:true,lowercase:true,required:true},
    password:{type:String, required:true, minlength:8,select:false},
    avata: String,
    followers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
    following: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
     tvShowWatching: [{
      id: {type:String, unique:true, required:true},
      name:{type:String, required:true},
      vote_average: Number,
      poster_path: String,
      backdrop_path:String,
      overview:String,
      genre: [{type:String}],
      origin_country: String,
      recommend: Boolean,
     }],
     tvShowWatched: [{
      id: {type:String, unique:true, required:true},
      name:{type:String, required:true},
      vote_average: Number,
      poster_path: String,
      backdrop_path:String,
      overview:String,
      genre: [String],
      origin_country: String,
      recommend: Boolean,
     }],
     listeningTrack : [{
      id: {type:String, unique:true,required:true },
      name:{type:String, required:true},
      artists: { type: [{type:String}], required:true },
      image: String,
      releaseDate: String,
      vibes: {type:[String]},
      like: Boolean,
  }],
  listenedTrack :[{
    id: {type:String, unique:true,required:true },
    name:{type:String, required:true},
    artists: { type: [String], required:true },
    image: String,
    releaseDate: String,
    vibes: [String],
    like: Boolean,
}]
})

UserSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password,12);
  next()
  
})

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  avata?: string;
  followers: UserDocument[];
  following: UserDocument[];
  tvShowWatching: TvShow[];
  tvShowWatched: TvShow[];
  listeningTrack: Track[];
  listenedTrack: Track[];
  correctPassword(givenPassword: string, password: string): Promise<boolean>;
}

UserSchema.methods.correctPassword=async function(givenPassword: String, password: String): Promise<boolean>{
  return await bcrypt.compare(givenPassword, password);
} 


const User = mongoose.model('User',UserSchema)
module.exports = User


