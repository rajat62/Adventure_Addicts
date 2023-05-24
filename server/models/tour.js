import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
        title: String,
        description:String,
        name:String,
        creator:String,
        tags: [String],
        imageFile:String,
        createdAt:{
            type:Date,
            default: new Date()
        },
        likes:{
            type:[String],
            default:[]
        }
})  

const tourModel = mongoose.model("tour", tourSchema);

export default tourModel;
