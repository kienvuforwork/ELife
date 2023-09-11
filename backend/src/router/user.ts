import express from "express"
import { getUser, addTrack, uploadTrackImage, TvShow} from "../controller/userController"
import { protect } from "../controller/authController"


export default (router:express.Router)=>{
    router.get("/user/getUser", getUser)
    router.post("/user/addTrack",protect,uploadTrackImage, addTrack)
    router.post("/user/TvShow",protect,uploadTrackImage, TvShow)

}   