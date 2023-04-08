// import mongoose from 'mongoose';
// import validator from 'validator';

// const { Schema, ObjectId } = mongoose 

// const StudentSchema = new Schema({
//     id: {
//         type: ObjectId,
//     },
//     name: {
//         type: String,
//         required: [true, 'Name is required.'],
//         minlength: [3, 'Name must be at least 3 characters long.']
//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required.'],
//         unique: [true, 'Email must be unique.'],
//         validate: [validator.isEmail, 'Email is not valid.']
//     },
//     languages: {
//         type: [String],
//     },
//     gender: {
//         type: String,
//         enum: ['Male', 'Female']
//     },
//     phone: {
//         type: String,
//         validate: {
//             validator: (phone) => validator.isMobilePhone(phone),
//             message: 'Phone is not valid.'
//         }
//     },
//     address: {
//         type: String,
//         minlength: [6, 'Address must be at least 6 characters long.']
//     },
// })

// export default mongoose.model('Student', StudentSchema);