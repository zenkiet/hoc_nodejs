import { print, type } from '../helpers/print.js'
import UserService from '../services/User.js'
import { Exception } from '../errors/index.js'
import MongoDB from '../utils/mongodb.util.js'
import bcrypt from 'bcrypt'

const login = async ({ email, password }) => {
    try {
        let existUser = await User.findOne({email}).exec()
        if(existUser){
            let isMatch = await bcrypt.compare(password, existUser.password)
            if(!!isMatch){
                // create JWT token
            } else {
                throw new Exception(Exception.WRONG_USER_PASSWORD)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const register = async ({ email, password, name, phone, address }) => {
    try{
        // hash password
        let hashedPassword = await bcrypt.hash(password, parseInt(process.env.SECRET_PHARSE))
        
        // use service create
        const userService = new UserService(MongoDB.client);
        const result = await userService.create({
            email,
            password: hashedPassword,
            name,
            phone,
            address
        });
        return result
    } catch (error){
        print(error.toString(), type.ERROR)
        throw new Exception(Exception.CANNOT_REGISTER_USER)
    }
}

export default {
    login,
    register
}