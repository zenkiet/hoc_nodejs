import { studentRepository } from '../repositories/index.js'
import HttpStatusCode from '../errors/HttpStatusCode.js'


const getAllStudents = async (req, res) => {
    // localhost:3000/students?page=1&size=10&searchString=abc
    let { page= 1, size= 10, searchString= '' } = req.query
    size = size > 10 ? 10 : size
    page = page < 1 ? 1 : page

    try {
        const result = await studentRepository.getAllStudents({page, size, searchString})
        res.status(HttpStatusCode.OK).json({
            message: 'GET all students',
            total: result.total,
            data: result.students
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
    try {
        const student = await studentRepository.getDetailStudent(id)
        if(!!student){
            res.status(HttpStatusCode.OK).json({
                message: `GET student by id: ${id}`,
                data: student
            })
        } else {
            res.status(HttpStatusCode.NOT_FOUND).json({
                message: `Student with id: ${id} not found`,
                error: 'Student not found'
            })
        }
    } catch(error){
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Can not get student by id',
            error: error.toString()
        })
    }
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
    const { id } = req.params
    try {
        const student = await studentRepository.updateStudent({id, ...req.body})
        if(!!student.messageError){
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message: 'Can not update student',
                validationErrors: student.validationErrors
            })
        } else {
            res.status(HttpStatusCode.OK).json({
                message: 'PUT update student',
                data: student
            })
        }
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Can not update student',
            validationErrors: exception.validationErrors
        })
    }
}

const generateFakeStudents = async (req, res) => {
    try {
        await studentRepository.generateFakeStudents()
        res.status(HttpStatusCode.OK).json({
            message: 'Generate fake students',
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Can not generate fake students',
            error: error.toString()
        })
    }
}

export default {
    getAllStudents,
    getStudentById,
    insertStudent,
    updateStudent,
    generateFakeStudents
}