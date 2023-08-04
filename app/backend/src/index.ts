import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression"
import http from "http";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./router";


const app = express()
app.use(cors({
    credentials : true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())


const server = http.createServer(app)

server.listen(8080, () => {
    console.log("server running on port 8080!")
})

const MONGO_URL = 'mongodb+srv://elife:elife@cluster0.ksmqir0.mongodb.net/?retryWrites=true&w=majority'
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error:Error) => console.log(error))
app.use("/", router())