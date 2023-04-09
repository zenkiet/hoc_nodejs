import { Exception } from "../errors/index.js"
import { StudentService } from "../services/index.js"
import MongoDB from "../utils/mongodb.util.js"

const getAllStudents = async ({page, size, searchString}) => {
    console.log('getAllStudents: ', page, size, searchString)
}

const insertStudent = async ({name, email, languages, gender, phone, address}) => {
    try {
        const student = new StudentService(MongoDB.client)
        const result = await student.create({
            name,
            email,
            languages,
            gender,
            phone,
            address
        })
        return result
    } catch (exception) {
        if(!!exception.errors) {
            throw new Exception('Input Error', exception.errors)
        }
    }
}   

export default {
    getAllStudents,
    insertStudent
}