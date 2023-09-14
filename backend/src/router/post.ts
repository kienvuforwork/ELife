import express from "express"
import { protect } from "../controller/authController"
import { getUserPost} from "../controller/postController"


export default (router:express.Router)=>{
    router.get("/post/user/:id", protect, getUserPost)
}   