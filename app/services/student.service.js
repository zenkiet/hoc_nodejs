import { ObjectId } from 'mongodb';
import validator from 'validator';

class StudentService {
    constructor(client) {
        this.Student = client.db().collection('students')
    }

    async validate(student) {
        const errors = {}

        if (!validator.isEmail(student.email)) {
            errors.email = 'Email is not valid'
        } else if (!validator.isMobilePhone(student.phone, 'vi-VN')) {
            errors.phone = 'Phone is not valid'
        } else if (!validator.isLength(student.name, { min: 6 })) {
            errors.name = 'Name length must be at least 6 characters'
        } else if (!validator.isLength(student.address, { min: 6 })) {
            errors.address = 'Address length must be at least 6 characters'
        } else if (!Array.isArray(student.languages) || student.languages.length < 1) {
            errors.language = 'Language must be an array with at least 1 element'
        } else if (!['Male', 'Female'].includes(student.gender)) {
            errors.gender = "Gender must be either 'Male' or 'Female'"
        }

        return Object.keys(errors).length > 0 ? errors : null
    }

    async extractStudentData(payload) {
        const student = {
            _id: payload._id && ObjectId.createFromHexString(payload._id),
            name: payload.name,
            email: payload.email,
            languages: payload.languages,
            gender: payload.gender,
            phone: payload.phone,
            address: payload.address,
        }

        const errors = await this.validate(student)
        if (!!errors) {
            return {
                messageError: "Input Error",
                validationErrors: errors
            }
        }

        Object.keys(student).forEach(
            (key) => (student[key] === undefined) && delete student[key]
        )
        return student;
    }

    async create(payload) {
        const student = await this.extractStudentData(payload)
        
        if(!!student.messageError){
            return student
        }

        await this.Student.findOneAndUpdate(
            { email: student.email },
            { $set: student },
            { upsert: true, returnOriginal: false }
        )

        return student
    }
}

export default StudentService