import { studentRepository } from '../repositories/index.js'
import HttpStatusCode from '../errors/HttpStatusCode.js'


const getAllStudents = async (req, res) => {
    res.status(HttpStatusCode.OK).json({
        message: 'GET all students',
        students: [
            {
                id: 1,
                name: 'Nguyen Van A',
                age: 20
            }
        ]
    })
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: 'Can not get all students',
        error: 'Internal server error'
    })
}

const getStudentById = async (req, res) => {
    res.send('GET student by id')
}

const insertStudent = async (req, res) => {
    res.send('PATCH insert student')
}

const updateStudent = async (req, res) => {
    res.send('POST update student')
}

export default {
    getAllStudents,
    getStudentById,
    insertStudent,
    updateStudent
}