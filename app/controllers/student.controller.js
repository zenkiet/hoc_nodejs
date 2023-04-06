const getAllStudents = async (req, res) => {
    res.status(200).json({
        message: 'GET all students',
        students: [
            {
                id: 1,
                name: 'Nguyen Van A',
                age: 20
            }
        ]
    })
    res.status(500).json({
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