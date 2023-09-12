import express from "express"
import { getUser, addTrack, uploadImage, TvShow, SearchUserByName, UpdateUser} from "../controller/userController"
import { protect } from "../controller/authController"


export default (router:express.Router)=>{
    router.get("/user/getUser", getUser)
    router.post("/user/addTrack",protect,uploadImage, addTrack)
    router.post("/user/TvShow",protect,uploadImage, TvShow)
    router.post("/users/search", SearchUserByName)
    router.post("/user/update", protect, uploadImage, UpdateUser)
}   