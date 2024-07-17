import { Comment } from "../models/comment.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const addComment = asyncHandler(async (req, res) => {
    const commentBody = req.body.commentBody
    const tags = ["positive", "negative"]

    const comment = await Comment.create({
        commentBody,
        tags
    })

    if (!comment) {
        throw Error("Failed to create comment")
    }

    return res.sendStatus(200)
})

const getComments = asyncHandler(async (req, res)=>{
    try {

        const comment = await Comment.find({})

        return res.status(200).send(
            {
                count: comment.length,
                data: comment
            }
        )
        
    } catch (error) {
        console.log(error.message)

        return res.status(500).send({
            message: error.message
        })
    }
})

const deleteComment = asyncHandler(async (req, res)=>{
  
        const id = req.params.id;
        const result = await Comment.findByIdAndDelete(id)

        if(!result){
            return res.status(400).send({
                message:"Failed to delete the comment"
            })
        }

        return res.status(200).send(
            {
                message: "comment deleted successfully"
            }
        )   

})

const editComment = asyncHandler(async (req, res)=>{
    const id =  req.params.id;

    const commentBody = req.body.commentBody
    const tags = ["positive", "negative"]


    const result = await Comment.findByIdAndUpdate(id, {
        commentBody,
        tags
    })
    if(!result){
        return res.status(400).send({
            message:"Failed to edit the comment"
        })
    }

    return res.status(200).send({
        message: "Comment edited successfully"
    })
    
})

export { addComment, getComments, deleteComment, editComment }