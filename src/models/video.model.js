import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema=new Schema({
    videoFile:{
        type:String, // cloudinary URL
        required:true,
    },
    thumnail:{
        type:String, // cloudinary URL
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    discription:{
        type:String,
        required:true,
    },
    duration:{
        type:Number,  // cloudinary URL
        required:true,
    },
    views:{
        type:Number,
        required:true,
    },
    isPublished:{
        type:Boolean,
        required:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
},{timestamps:true})


videoSchema.plugin(mongooseAggregatePaginate)


export const Video=mongoose.model("Video",videoSchema)