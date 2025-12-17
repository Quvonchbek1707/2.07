import { Router } from "express";
import { createUser, getUserByQuery, getUserSingle, getUsersAll, putUser, deleteUser } from "../controller/users.js";

const UsersRouter = Router()

UsersRouter.get("/Users/all", getUsersAll)
UsersRouter.get("/Users/single/:id", getUserSingle)
UsersRouter.get("/Users", getUserByQuery)
UsersRouter.post("/Users", createUser)
UsersRouter.put("/Users/:id", putUser)
UsersRouter.delete("/Users/:id", deleteUser)

export default UsersRouter