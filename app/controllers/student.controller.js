import { studentRepository } from '../repositories/index.js'
import HttpStatusCode from '../errors/HttpStatusCode.js'


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
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Can not get all students',
            error: error.toString()
        })
    }
}

const getStudentById = async (req, res) => {
    const { id } = req.params
    res.status(HttpStatusCode.OK).json({
        message: `GET student with id: ${id}`,
    })
}

const insertStudent = async (req, res) => {
    try {
        const student = await studentRepository.insertStudent(req.body)
        if(!!student.messageError){
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message: 'Can not insert student',
                validationErrors: student.validationErrors
            })
        } else {
            res.status(HttpStatusCode.CREATED).json({
                message: 'POST insert student',
                data: student
            })
        }
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Can not insert student',
            validationErrors: exception.validationErrors
        })
    }
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