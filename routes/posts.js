import express from "express";

import { getPosts, createPosts } from "../controllers/posts.js";

const router = express.Router();

router.get("/get", getPosts);
router.post("/create", createPosts);

export default router;
