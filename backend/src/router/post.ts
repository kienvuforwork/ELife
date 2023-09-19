import express from "express"
import { getUserPost} from "../controller/postController"


export default (router:express.Router)=>{
    router.get("/post/user/:username",  getUserPost)
}   