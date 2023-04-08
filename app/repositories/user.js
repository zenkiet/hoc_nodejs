import { print, type } from '../helpers/print.js'
import { User } from '../models/index.js'
import { Exception } from '../errors/index.js'
import bcrypt from 'bcrypt'


const login = async ({ email, password }) => {
    print('login user in user repository', type.INFO);
}

const register = async ({ email, password, name, phone, address }) => {
    print(`
        Register user with: 
        email: ${email} 
        password: ${password} 
        name: ${name} 
        phone: ${phone}
        address: ${address}
    `, type.INFO);

    // validate exist user
    try{
        // let existUser = await User.findOne({ email  })
        // if(!!existUser){ //check not null
        //     throw new Exception(Exception.USER_EXIST)
        // }

        // hash password
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT))

        // create user
        const newUser = new User({
            name, 
            email,
            password: hashedPassword,
            phone,
            address
        })

        return {
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            address: newUser.address,
            password: "not show password"
        }; //! important save()
    } catch (error){
        print(error.toString(), type.ERROR)
        throw new Exception(Exception.CANNOT_REGISTER_USER)
    }
}

export default {
    login,
    register
}