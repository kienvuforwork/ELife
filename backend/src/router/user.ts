import express from "express"
import { getUser, userAddTrack, uploadImage, SearchUserByName, UpdateUser, userAddTvShow, uploadAvatar, uploadAvatarMulter} from "../controller/userController"
import { protect } from "../controller/authController"
import { GetAvatar } from "../controller/imageController"

export default (router:express.Router)=>{
    router.get("/user", getUser)
    router.post("/user/track",protect,uploadImage, userAddTrack)
    router.post("/user/tvShow",protect,uploadImage, userAddTvShow)
    router.post("/users/username", SearchUserByName)
    router.post("/user/update", protect,uploadAvatarMulter, uploadAvatar,  UpdateUser)
    router.get("/user/avatar/:id",  GetAvatar)
}   