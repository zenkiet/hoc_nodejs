import { ObjectId } from 'mongodb';
import validator from 'validator';

class UserService {
    constructor(client) {
        this.User = client.db().collection('users')
    }

    async validate(user){
        const errors = {};

        if (!validator.isEmail(user.email)) {
            errors.email = 'Email is not valid'
        } else if(!validator.isMobilePhone(user.phone, 'vi-VN')) {
            errors.phone = 'Phone is not valid'
        } else if(!validator.isLength(user.password, { min: 6})) {
            errors.password = 'Password length must be at least 6 characters'
        } else if(!validator.isLength(user.name, { min: 6})) {
            errors.name = 'Name length must be at least 6 characters'
        } else if(!validator.isLength(user.address, { min: 6})) {
            errors.address = 'Address length must be at least 6 characters'
        }

        let existUser = await this.User.findOne({ email: user.email })
        if(existUser){
            errors.email = 'Email is already exist'
        }

        if (Object.keys(errors).length > 0) {
            throw new Error(JSON.stringify(errors))
        }
    }

    extactUserData(payload) {
        const user = {
            _id: payload._id && ObjectId.createFromHexString(payload._id),
            name: payload.name,
            email: payload.email,
            password: payload.password,
            phone: payload.phone,
            address: payload.address,
        }
        
        this.validate(user)

        Object.keys(user).forEach(
            (key) => (user[key] === undefined) && delete user[key]
        )
        return user;
    }

    async create(payload) {
        const user = this.extactUserData(payload)
        
        await this.User.findOneAndUpdate(
            { email: user.email },
            { $set: user },
            { upsert: true, returnOriginal: false }
        )
        return user
    }

    async find(filter){
        const cursor = this.User.find(filter);
        return cursor.toArray()
    }

    async findById(id){
        return await this.User.findOne({
            _id: ObjectId.createFromHexString(id)
        })
    }

    async findByEmail(email){
        return await this.User.findOne({
            email
        })  
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.createFromHexString(id)
        }
        const update = this.extactUserData(payload)
        const result = await this.User.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        )
        return result.value
    }

    async delete(id){
        const result = await this.User.findOneAndDelete({
            _id: ObjectId.createFromHexString(id)
        })
        return result.value
    }

    async deleteAll(){
        const result = await this.User.deleteMany({})
        return result.deletedCount
    }
}

export default UserService