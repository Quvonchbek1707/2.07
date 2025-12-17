import fs from "fs"
import path from "path";
const FILE = path.join(process.cwd(),"src", "db", "users.json");


function read(){
    return JSON.parse(fs.readFileSync(FILE, "utf-8"))
}
function write(data){
    const myData = JSON.stringify(data, null, 4)
    fs.writeFileSync(FILE, myData, "utf-8")
}

const createUser = (req, res)=>{
    const body = req.body;
    const newUser = {id: Date.now()%500, ...body}
    let users = read()
    users.push(newUser)
    write(users)

    return res.status(201).send(newUser)
}

const getUsersAll = (req, res)=>{
    const users = read()
    return res.status(200).send(users)
}

const getUserSingle = (req, res)=>{
    const users = read()
    const {id} = req.params
    const userId = users.find(u => u.id === Number(id))
    if (userId===-1){
        return res.status(404).send({message: "User Not Found"})
    }else{
        return res.status(200).send(users[userId])
    }
}

const getUserByQuery = (req, res) => {
    const users = read();
    const filters = ["firstName", "lastName", "age", "id"];
    
    if (Object.keys(req.query).length === 0) {
        return res.status(400).send("No filters provided");
    }
    const result = users.filter(obj =>
      filters.every(key =>
        req.query[key] === undefined || String(obj[key]) === String(req.query[key])
      )
    );

    if (result.length === 0) {
        return res.status(404).send({ message: "Not Found" });
    }

    return res.status(200).send(result);
};

const putUser = (req, res)=>{
    const users = read()
    const body = req.body
    const {id} = req.params
    let UserId = users.findIndex((element)=> element.id === +id)
    if (UserId===-1){
        return res.status(404).send({message: "User Not Found"})
    }else{
        users[UserId] = {...users[UserId], ...body}
        write(users)
        return res.status(200).send(users[UserId])
    }
}


const deleteUser = (req, res)=>{
    const users = read()
    const {id} = req.params
    let UserId = users.findIndex((element)=> element.id === +id)
    if (UserId===-1){
        return res.status(404).send({message: "User Not Found"})
    }else{
        users.splice(UserId, 1)
        write(users)
        return res.status(200).send({message: "Successfully deleted"})
    }
}

export {createUser, getUsersAll, getUserSingle, getUserByQuery, putUser, deleteUser}