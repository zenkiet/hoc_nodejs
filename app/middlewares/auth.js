import { HttpStatusCode } from "../errors/index.js"
import jwt from 'jsonwebtoken'


const byPassToken = (req) => {
    const PUBLIC_URLS = ['/users/login', '/users/register'];
    let url = req.url.toLowerCase().trim()
    return PUBLIC_URLS.includes(url)
}

const requireToken = (req, res) => {
    const token = req.headers['x-access-token'] || req.headers['authorization']
    if (!token) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            message: 'Token is required',
        });
        return;
    }
    return token;
}


export default function checkToken(req, res, next) {
    // check bypass 
    if (byPassToken(req)) {
        return next()
    }

    // check token
    try {
        const token = requireToken(req, res).replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const isExpired = decoded.exp < Date.now() / 1000
        if (isExpired) {
            res.status(HttpStatusCode.UNAUTHORIZED).json({
                message: "Token is expired",
            })
        }
        return next()
    } catch (error) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            message: "Unauthorized",
            error: error.toString()
        })
        return
    }
}