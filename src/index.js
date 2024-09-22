// require ('dotenv').config({path:'./env'})

import dotenv from 'dotenv';
import connectDB from "./db/index.js";
import {app} from './app.js';
dotenv.config({
    path: './.env',
})

connectDB()
.then(()=>{
    app.on("Error",(error)=>{
        console.log("Error listen after app listen start",error);
    });

    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on port ${process.env.PORT || 8000}`)
    })
    
})
.catch((error)=>{
    console.log("Monogo DB connection failed",error);
})

// import express from 'express';
// const app=express();
// ; (async()=>{
//     try{
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("Error",(error)=>{
//         console.error("Error",error);
//         throw error;
//        })

//        app.listen(process.env.PORT,()=>{
//         console.log("App listening on port :", process.env.PORT);
//        })

//     }catch(error){
//         console.log("Error",error);
//         throw error;
//     }
// })()