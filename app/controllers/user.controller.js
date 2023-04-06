import { validationResult } from 'express-validator'
import userRepository from '../repositories/index.js'

const login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    // call repository
    await userRepository.login(email, password)
    res.status(200).send('login success')
}

const register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    res.status(200).send('login success')
}

const getDetailUser = async (req, res) => {
    const { id } = req.params
    res.status(200).json({
        message: `GET detail user with id: ${id}`,
    })
    

}

export default {
    login,
    register,
    getDetailUser
}