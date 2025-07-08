import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routes/userRoute.js";
dotenv.config()
const app = express();
app.use(express.json());

const dbuser = encodeURIComponent(process.env.DBUSER)
const dbpass = encodeURIComponent(process.env.DBPASS)

const url =`mongodb+srv://${dbuser}:${dbpass}@cluster0.l5bwikr.mongodb.net/merncafe?retryWrites=true&w=majority&appName=Cluster0`


mongoose.connect(url).then(() => {
  app.listen(8082, () => {
    console.log("Server started");
  });
});

app.use("/api/users", userRouter);