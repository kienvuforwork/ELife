import mongoose from "mongoose";
import { Track } from "./trackModel";
import { TvShow } from "./tvShowModel";
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    username: {type:String, required:true},
    email: {type:String , unique:true,lowercase:true,required:true},
    password:{type:String, required:true, minlength:8,select:false},
    avatar: String,
    isCeleb: Boolean, 
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
      vibes: {type:[String]},
      createdAt: {
        type: Date, // Specifies that this field is of type Date
        default: Date.now // Sets the default value to the current date and time
      }
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
      describe: [{type:String}],
      vibes: {type:[String]},
     }],
     listeningTrack : [{
      id: {type:String, unique:true,required:true },
      name:{type:String, required:true},
      artists: { type: [{type:String}], required:true },
      image: String,
      releaseDate: String,
      vibes: {type:[String]},
      like: Boolean,
      createdAt: {
        type: Date, // Specifies that this field is of type Date
        default: Date.now // Sets the default value to the current date and time
      },
   
  }],
  listenedTrack :[{
    id: {type:String, unique:true,required:true },
    name:{type:String, required:true},
    artists: { type: [String], required:true },
    image: String,
    releaseDate: String,
    vibes: [String],
    like: Boolean,

}],
  posts : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
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


