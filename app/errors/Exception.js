import {print, type} from '../utils/index.js'

export default class Exception extends Error {
    static DB_USERNAME_PASSWORD = 'Username or password is incorrect'
    static DB_CONNECTION_STRING = 'Wrong connection string for MongoDB'
    static DB_CONNECTION = 'Cannot connect to MongoDB'

    static USER_EXIST = 'User already exists'
    static PASSWORD_NOT_MATCH = 'Password is not match'
    static CANNOT_REGISTER_USER = 'Cannot register user'
    static WRONG_USER_PASSWORD = 'Wrong username or password'
    
    constructor(message, validateErrors = {}) {
        super(message)
        print(message, type.ERROR)
        this.validateErrors = validateErrors
    }
}