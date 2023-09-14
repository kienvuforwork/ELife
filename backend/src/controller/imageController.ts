import { catchAsync } from "../ErrorHandler/catchAsync";
import express from "express";

export const GetAvatar =catchAsync( async (req:express.Request, res:express.Response) => {
    const id = req.params.id;
    const imagePath =  `C:/Users/kienv/OneDrive/Desktop/elife/elife/backend/public/img/users/user-${id}.jpeg`
    res.sendFile(imagePath);
})