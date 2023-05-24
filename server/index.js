import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import morgan from "morgan";
import UserRouter from "./routes/user.js";
import TourRouter from "./routes/tour.js"
import  bodyParser from 'body-parser';
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(express.json({limit: "30mb", extended: "true"}))
app.use(express.urlencoded({limit: "30mb", extended: "true"}));
app.use(cors());
app.use(bodyParser.json());


app.use("/users", UserRouter);
app.use("/tour", TourRouter);

const mongoURL = `mongodb+srv://${process.env.CLUSTER}:${process.env.PASSWORD}@cluster0.c7yv9xz.mongodb.net/travel_app?retryWrites=true&w=majority`;


mongoose.connect(mongoURL).then(()=>{
      app.listen(process.env.PORT, ()=>{
            console.log(`server running on the port number ${process.env.PORT} `)
      })
}).catch((err)=>{console.log(err)})



