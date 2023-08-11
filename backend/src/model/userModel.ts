import mongoose from "mongoose";
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
     moviesWatching: [{type:Number}],
     moviesWatched: [{type:Number}],
      
})

UserSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password,12);
  next()
  
})

UserSchema.methods.correctPassword=async function(givenPassword: String, password: String): Promise<boolean>{
  return await bcrypt.compare(givenPassword, password);
} 


const User = mongoose.model('User',UserSchema)
module.exports  = User;


