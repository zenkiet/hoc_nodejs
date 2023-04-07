import mongoose, { Schema, ObjectId } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
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
    password: {
        type: String,
        required: true,
        validate: {
            validator: (password) => password.length > 6,
            message: 'Password must be longer than 6 characters.'
        }
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
        required: true,
        validate: {
            validator: (address) => address.length > 6,
            message: 'Address must be longer than 6 characters.'
        }
    },
})

UserSchema.pre('save', function(next) {
    const user = this;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        });
    });
})

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });
}

export default mongoose.model('User', UserSchema);