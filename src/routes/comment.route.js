import { Router } from "express";
import { addComment, getComments, deleteComment, editComment } from "../controllers/comment.controller.js";
import { aiParser } from "../middlewares/aiModel.middleware.js";


const router = Router()

router.post('/save-comment', aiParser,  addComment)
router.get('/list-comments', getComments)
router.delete('/delete-comment/:id', deleteComment)
router.put('/edit-comment/:id', editComment)

export default router