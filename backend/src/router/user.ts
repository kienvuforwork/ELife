import express from "express"
import { getUser } from "../controller/userController"

export default (router:express.Router)=>{
    router.get("/user/getUser", getUser)


}   