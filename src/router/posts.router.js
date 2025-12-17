import { Router } from "express";
import { createPost, getPostByQuery, getPostSingle, getPostsAll, putPost, deletePost } from "../controller/posts.js";

const PostsRouter = Router()

PostsRouter.get("/posts/all", getPostsAll)
PostsRouter.get("/posts/single/:id", getPostSingle)
PostsRouter.get("/posts", getPostByQuery)
PostsRouter.post("/posts", createPost)
PostsRouter.put("/posts/:id", putPost)
PostsRouter.delete("/posts/:id", deletePost)

export default PostsRouter