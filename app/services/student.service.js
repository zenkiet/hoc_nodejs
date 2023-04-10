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
        } else if (!validator.isMobilePhone(student.phone)) {
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

    async getAll({ page, size, searchString }) {
        const query = searchString ? { name: { $regex: searchString, $options: 'i' } } : {}
        const students = await this.Student.find(query).skip((page - 1) * size).limit(size).toArray()
        const total = await this.Student.countDocuments(query)
        return { students, total }
    }

    async getDetail(id) {
        const student = await this.Student.findOne({ _id: ObjectId.createFromHexString(id) })
        return student
    }

    async updateStudent(id, updatedData){
        try {
            const updatedStudent = await this.Student.updateOne(
                { _id: ObjectId.createFromHexString(id) },
                { $set: updatedData }
            );
            return updatedStudent.acknowledged;
        } catch (err) {
            throw new Error(`Failed to update student: ${err.message}`);
        }
    }

    async create(payload) {
        const student = await this.extractStudentData(payload)

        if (!!student.messageError) {
            return student
        }

        await this.Student.findOneAndUpdate(
            { email: student.email },
            { $set: student },
            { upsert: true, returnOriginal: false }
        )

        return student
    }

    async insertMany(payload) {
        let students = []
        let length = payload.length
        for (let i = 0; i < length; i++) {
            const student = await this.extractStudentData(payload[i])
            students.push(student)
        }

        const invalidStudents = students.filter(student => !!student.messageError)
        if (invalidStudents.length > 0) {
            return {
                messageError: "Input Error",
                validationErrors: invalidStudents.map(student => student.validationErrors)
            }
        }

        const result = await this.Student.insertMany(students)
        return result
    }
}

export default StudentService