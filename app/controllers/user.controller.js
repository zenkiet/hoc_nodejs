import { validationResult } from 'express-validator'
import { userRepository } from '../repositories/index.js'
import { EventEmitter } from 'node:events'
import HttpStatusCode from '../errors/HttpStatusCode.js'

const myEvent = new EventEmitter()

//listen
myEvent.on('event.register.user', (params) => {
    console.log(`event.register.user', ${JSON.stringify(params)}`)
})

const login = async (req, res) => {
    //* Validate request
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
        //* Call repository
        let existUser = await userRepository.login({ email, password })
        if(existUser){
            res.status(HttpStatusCode.OK).json({
                message: 'Login success',
                user: existUser
            })
        } else {
            res.status(HttpStatusCode.UNAUTHORIZED).json({
                message: 'Login failed',
            })
        }
    } catch(error){
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: error.toString()
        })
    }
}

const register = async (req, res) => {
    const { name, email, password, phone, address } = req.body
    // call repository
    
    myEvent.emit('event.register.user', req.body)
    try {
        const user = await userRepository.register({
            name, email, password, phone, address
        })
        res.status(HttpStatusCode.OK).json({
            message: 'Register success',
            user
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: error.toString()
        })
    }
}

const getDetailUser = async (req, res) => {
    const { id } = req.params
    res.status(HttpStatusCode.OK).json({
        message: `GET detail user with id: ${id}`,
    })
}

export default {
    login,
    register,
    getDetailUser
}