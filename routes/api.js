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

router.delete("/delete/:id", (req, res)=>{
    const id = req.params.id;

    posts.deletePost(id);

    console.log("post deletado com sucesso!")
    res.send({message: "Post deletado"});
})

export default router;