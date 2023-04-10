import { Exception } from "../errors/index.js"
import { StudentService } from "../services/index.js"
import { MongoDB, print, type } from "../utils/index.js"
import { faker } from '@faker-js/faker';

// format location vi
faker.locale = 'vi';

const getAllStudents = async ({page, size, searchString}) => {
    try {
        const student = new StudentService(MongoDB.client)
        const result = await student.getAll({page, size, searchString})
        return result
    } catch (error) {
        throw new Exception('Can not get all students', error)
    }
}

const getDetailStudent = async (id) => {
    try {
        const student = new StudentService(MongoDB.client)
        const result = await student.getDetail(id)
        return result
    } catch (error) {
        throw new Exception('Can not get detail student', error)
    }
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

const updateStudent = async({id, name, email, languages, gender, phone, address}) => {
    try{
        const student = new StudentService(MongoDB.client)
        const findStudent = await student.getDetail(id)

        if(!findStudent) {
            throw new Exception('Student not found', null)
        } else{
            findStudent.name = name ?? findStudent.name
            findStudent.email = email ?? findStudent.email
            findStudent.languages = languages ?? findStudent.languages
            findStudent.gender = gender ?? findStudent.gender
            findStudent.phone = phone ?? findStudent.phone
            findStudent.address = address ?? findStudent.address

            const result = await student.updateStudent(id, findStudent)
            return result
        }
    } catch (exception){
        if(!!exception.errors) {
            throw new Exception('Input Error', exception.errors)
        }
    }
}

const generateFakeStudents = async () => {
    let fakeStudents = []
    for(let i = 0; i < 100; i++) {
        let fakeStudent = {
            name: `${faker.name.fullName()}-fake`,
            email: faker.internet.email(),
            languages: [
                faker.helpers.arrayElement(['English', 'Spanish', 'French', 'German', 'Russian', 'Chinese', 'Japanese', 'Korean']),
            ],
            gender: faker.helpers.arrayElement(['Male', 'Female']),
            phone: faker.phone.number('0#########'),
            address: faker.address.streetAddress()
        }
        fakeStudents.push(fakeStudent)
    }

    const student = new StudentService(MongoDB.client)
    const result = await student.insertMany(fakeStudents)
    if(!!result.messageError){
        throw new Exception('Input Error', result.validationErrors)
    }
    print(`---Generate fake student---`, type.SUCCESS)
}

export default {
    getAllStudents,
    getDetailStudent,
    insertStudent,
    updateStudent,
    generateFakeStudents,
    generateFakeStudents
}