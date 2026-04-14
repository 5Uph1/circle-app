import express from "express";
import { getThread, postThread, toggleLike } from "../controllers/thread";
import { authenticate } from "../middlewares/auth";
import { upload } from "../middlewares/upload";

export const thread = express.Router();

thread.get('/', authenticate, getThread);
thread.post('/post', upload.single('image'), authenticate, postThread);
thread.post('/:id/like', authenticate, toggleLike);