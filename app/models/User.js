// import mongoose from 'mongoose';
// import validator from 'validator';
// import bcrypt from 'bcrypt';
// import * as dotenv from 'dotenv';
// dotenv.config()

// const SECRET_PHARSE = process.env.SECRET_PHARSE
// const { Schema, ObjectId } = mongoose;

// const UserSchema = new Schema({
//     id: {
//         type: ObjectId,
//     },
//     name: {
//         type: String,
//         required: true,
//         minlength: [4, 'Name must be longer than 3 characters.']
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         validate: {
//             validator: (value) => validator.isEmail(value),
//             message: 'Email is not valid.'
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: [6, 'Password must be longer than 6 characters.']
//     },
//     phone: {
//         type: String,
//     },
//     address: {
//         type: String,
//         required: true,
//         minlength: [6, 'Address must be longer than 6 characters.']
//     },
// })

// UserSchema.pre('save', async function (next) {
//     const user = this;
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, parseInt(SECRET_PHARSE));
//     }
//     next();
// });

// UserSchema.methods.toJSON = function () {
//     const user = this;
//     const userObject = user.toObject();
//     delete userObject.password;
//     return userObject;
// }

// export default mongoose.model('User', UserSchema);