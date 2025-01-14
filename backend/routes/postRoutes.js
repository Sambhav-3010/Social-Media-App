import express from 'express';
import { createPost, getPosts, likePost } from '../controllers/postController.js';
const router = express.Router();

router.post('/create', createPost);
router.get('/show', getPosts);
router.post('/:id/like', likePost);

export default router;