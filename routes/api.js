import express from 'express';
import posts from '../models/posts.js';

const router = express.Router();

router.get("/all", (req, res)=>{
    res.json(posts.getAll());
});

router.post("/new", (req, res)=>{
    let title = req.body.title;
    let description = req.body.description;

    posts.newPost(title, description);
    res.send("Post adicionado");
});

export default router;