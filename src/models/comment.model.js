import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    // uid:{
    //     type: mongoose.Schema.ObjectId,
    //     required: true,
    //     index: true
    // },
    commentBody:{
        type: String,
        required: true,
    },
    tags: {
        type:[{
            type:String
        }]
    }
},{timestamps:true})

export const Comment = mongoose.model("Comment", commentSchema)