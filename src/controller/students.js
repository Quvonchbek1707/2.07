import { json } from "body-parser";
import e from "express";
import fs from "fs"
import path from "path"
const FILE = path.join(process.cwd(), "src", "db", "students.json");

function read(){
    return JSON.parse(fs.readFileSync(FILE, "utf-8"))
}
function write(data){
    const myData = JSON.stringify(data, null, 4)
    fs.writeFileSync(FILE, myData, "utf-8")
}

const createStudent = (req, res)=>{
    const body = req.body
    const newStudent = {id: Date.now()%500, ...body}
    let students = read();
    students.push(newStudent)
    write(students)
    return res.status(201).send(newStudent)
}

const getAllStudents = (req, res) =>{
    const students = read()
    return res.status(200).send(students)
}

const getStudentSingle = (req, res)=>{
    const students = read()
    const {id} = req.params
    const StudentId = students.find(uu=> uu.id===Number(id))
    if(StudentId===-1){
        return res.status(404).send({message: "Student Not Found"})
    }else{
        return res.status(200).send(students[StudentId])
    }
}

const getStudentByQuery = (req, res)=>{
    const students = read()
    const filters = ["firstName", "lastName", "course", "id"]

    if(Object.keys(req.query.length ===0)){
        return res.status(400).send("No Filters Given")
    }
    const result = students.filter(obj => filters.every(key => req.query[key]===undefined || String(obj[key])===String(req.query[key])
))
    if(result.length===0){
        return res.status(404).send({message: "Not Found"})
    }

    return res.status(200).send(result)
}

const putStudent = (req, res)=>{
    const students = read()
    const body = req.body
    const {id} = req.params
    let StudentId = students.findIndex((element)=> element.id === Number(id))
    if(StudentId===-1){
        return res.status(404).send({message: "Not Found"})
    }else{
        students[StudentId] = {...students[StudentId], ...body}
        write(students)
        return res.status(200).send(students[StudentId])
        }
}

const deleteStudent = (req, res)=>{
    const students = read()
    const {id} = req.params
    let StudentId = students.findIndex((element)=>element.id===Number(id))
    if(StudentId===-1){
        return res.status(404).send({message: "Not Found"})
    }else{
        students.splice(StudentId, 1)
        write(students)
        return res.status(200).send({message: "Successfully deleted"})
    }
}

export {createStudent, getAllStudents, getStudentByQuery, getStudentSingle, putStudent, deleteStudent}