import mongoose, { Schema, ObjectId } from 'mongoose';
import isEmail  from 'validator/lib/isEmail.js';
import * as dotenv from 'dotenv';
dotenv.config();

const SECRET_PHARSE = parseInt(process.env.SECRET_PHARSE);

const UserSchema = new Schema({
    id: {
        type: ObjectId,
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.length > 3,
            message: 'Name must be longer than 3 characters.'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => isEmail(value),
            message: 'Email is not valid.'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.length > 6,
            message: 'Password must be longer than 6 characters.'
        }
    },
    phone: {
        type: String
        // validate: {
        //     validator: (value) => validator.isMobilePhone(phone,
        //     message: 'Phone is not valid.'
        // }
    },
    address: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.length > 6,
            message: 'Address must be longer than 6 characters.'
        }
    },
})

// UserSchema.pre('save', function(next) {
//     const user = this;
//     bcrypt.genSalt(SECRET_PHARSE, (err, salt) => {
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             user.password = hash;
//             next();
//         });
//     });
// })

// UserSchema.methods.comparePassword = (candidatePassword, callback) => {
//     bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//         if (err) return callback(err);
//         callback(null, isMatch);
//     });
// }


export default mongoose.model('User', UserSchema);