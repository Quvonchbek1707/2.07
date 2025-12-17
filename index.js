import  express from "express"
import {PostsRouter, UsersRouter, StudentRouter} from "./src/router/router.js"

const app = express()
app.use(express.json())
app.use(PostsRouter)
app.use(StudentRouter)
app.use(UsersRouter)


const PORT = 3005

app.listen(PORT, ()=>{
    console.log(`Server running on server ${PORT}`)
});