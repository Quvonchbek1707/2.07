import { Router } from "express";
import { createStudent, getAllStudents, getStudentByQuery, getStudentSingle, putStudent, deleteStudent } from "../controller/students.js";

const StudentRouter = Router()

StudentRouter.get("/Users/all", getAllStudents)
StudentRouter.get("/Users/single/:id", getStudentSingle)
StudentRouter.get("/Users", getStudentByQuery)
StudentRouter.post("/Users", createStudent)
StudentRouter.put("/Users/:id", putStudent)
StudentRouter.delete("/Users/:id", deleteStudent)

export default StudentRouter