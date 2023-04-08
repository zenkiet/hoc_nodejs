import { studentRepository } from '../repositories/index.js'
import HttpStatusCode from '../errors/HttpStatusCode.js'
import { json } from 'express'


const getAllStudents = async (req, res) => {
    try {
        await res.status(HttpStatusCode.OK).json({
            message: 'GET all students',
            students: [
                {
                    id: 1,
                    name: 'Nguyen Van A',
                    age: 20
                }
            ]
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(json({
            message: 'Can not get all students',
            error: error.toString()
        }))
    }
}

const getStudentById = async (req, res) => {
    const { id } = req.params
    res.status(HttpStatusCode.OK).json({
        message: `GET student with id: ${id}`,
    })
}

const insertStudent = async (req, res) => {
    await res.status(HttpStatusCode.OK).json({
        message: 'POST insert student',
    })
}

const updateStudent = async (req, res) => {
    await res.status(HttpStatusCode.OK).json({
        message: 'POST update student',
    })
}

export default {
    getAllStudents,
    getStudentById,
    insertStudent,
    updateStudent
}