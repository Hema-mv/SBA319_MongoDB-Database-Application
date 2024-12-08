import mongoose from "mongoose";
//const mongoose=require("mongoose");
import dotenv from 'dotenv';
//const dotenv=require('dotenv');
dotenv.config();

const mongoURI=process.env.MONGO_URI;
const db=mongoose.connection;

mongoose.connect(mongoURI);
mongoose.connection.once('open',()=>{
    console.log('connected to MongoDb')
})


export default db;

//module.exports=db;

