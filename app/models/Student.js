import mongoose, { Schema, ObjectId } from 'mongoose';
import validator from 'validator';

const StudentSchema = new Schema({
    id: {
        type: ObjectId,
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: (name) => name.length > 3,
            message: 'Name must be longer than 3 characters.'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => validator.isEmail(email),
            message: 'Email is not valid.'
        }
    },
    languages: {
        type: [String],
    },
    gender: {
        type: String,
        enum: {
            values: ['Male', 'Femail'],
            message: '{VALUE} is not supported.'
        },
    },
    phone: {
        type: String,
        validate: {
            validator: (phone) => validator.isMobilePhone(phone),
            message: 'Phone is not valid.'
        }
    },
    address: {
        type: String,
        validate: {
            validator: (address) => address.length > 6,
            message: 'Address must be longer than 6 characters.'
        }
    },
})

export default mongoose.model('Student', StudentSchema);