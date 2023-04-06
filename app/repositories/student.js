const getAllStudents = async ({page, size, searchString}) => {
    console.log('getAllStudents: ', page, size, searchString)
}

const insertStudent = async ({name, email, languages, gender, phone, address}) => {
    console.log('insert student: ', name, email, languages, gender, phone, address)
}   

export default {
    getAllStudents,
    insertStudent
}