import {print, type} from '../helpers/print.js'

export default class Exception extends Error {
    static DB_USERNAME_PASSWORD = 'Username or password is incorrect'
    static DB_CONNECTION_STRING = 'Wrong connection string for MongoDB'
    static DB_CONNECTION = 'Cannot connect to MongoDB'

    static USER_EXIST = 'User already exists'
    constructor(message) {
        super(message)
        print(message, type.error)
    }
}