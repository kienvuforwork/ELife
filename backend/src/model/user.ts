import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type:String, required:true},
    email: {type:String ,required:true},
        password:{type:String, required:true, select:false}


})

export const UserModel = mongoose.model('User',UserSchema)

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email:string) => UserModel.findOne({email})
export const createUser = (values : Record<string,any>) => new UserModel(values).save().then((user) => user.toObject()
)

