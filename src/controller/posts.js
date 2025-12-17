import fs from "fs"
import path from "path";
const FILE = path.join(process.cwd(),"src", "db", "posts.json");


function read(){
    return JSON.parse(fs.readFileSync(FILE, "utf-8"))
}
function write(data){
    const myData = JSON.stringify(data, null, 4)
    fs.writeFileSync(FILE, myData, "utf-8")
}

const createPost = (req, res)=>{
    const body = req.body;
    const newPost = {id: Date.now()%500, ...body}
    let posts = read()
    posts.push(newPost)
    write(posts)

    return res.status(201).send(newPost)
}

const getPostsAll = (req, res)=>{
    const posts = read()
    return res.status(200).send(posts)
}

const getPostSingle = (req, res)=>{
    const posts = read()
    const {id} = req.params
    const PostId = posts.find(u => u.id === Number(id))
    if (PostId===-1){
        return res.status(404).send({message: "Post Not Found"})
    }else{
        return res.status(200).send(posts[PostId])
    }
}

const getPostByQuery = (req, res) => {
    const posts = read();
    const filters = ["firstName", "lastName", "age", "id"];
    
    if (Object.keys(req.query).length === 0) {
        return res.status(400).send("No filters provided");
    }
    const result = posts.filter(obj =>
      filters.every(key =>
        req.query[key] === undefined || String(obj[key]) === String(req.query[key])
      )
    );

    if (result.length === 0) {
        return res.status(404).send({ message: "Not Found" });
    }

    return res.status(200).send(result);
};

const putPost = (req, res)=>{
    const posts = read()
    const body = req.body
    const {id} = req.params
    let PostId = posts.findIndex((element)=> element.id === +id)
    if (PostId===-1){
        return res.status(404).send({message: "Post Not Found"})
    }else{
        posts[PostId] = {...posts[PostId], ...body}
        write(posts)
        return res.status(200).send(posts[PostId])
    }
}


const deletePost = (req, res)=>{
    const posts = read()
    const {id} = req.params
    let PostId = posts.findIndex((element)=> element.id === +id)
    if (PostId===-1){
        return res.status(404).send({message: "Post Not Found"})
    }else{
        posts.splice(PostId, 1)
        write(posts)
        return res.status(200).send({message: "Successfully deleted"})
    }
}

export {createPost, getPostsAll, getPostSingle, getPostByQuery, putPost, deletePost}