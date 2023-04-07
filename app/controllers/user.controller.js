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
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    // call repository
    await userRepository.login(email, password)
    res.status(HttpStatusCode.OK).send('login success')
}

const register = async (req, res) => {
    const { name, email, password, phone, address } = req.body
    console.log(name, email, password, phone, address)
    // call repository
    await userRepository.register({
        name, email, password, phone, address
    })
    myEvent.emit('event.register.user', req.body)
    res.status(HttpStatusCode.CREATED).send('register success')
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