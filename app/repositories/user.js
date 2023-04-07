import { print, type } from '../helpers/print.js'
import { User } from '../models/index.js'
import { Exception } from '../errors/index.js'

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
        let existUser = await User.FindOne({email: email})
        if(!!existUser){ //check not null
            //throw new Exception(Exception.USER_EXIST)
        }
        // encrypt password
        
    } catch (error){

    }
}

export default {
    login,
    register
}