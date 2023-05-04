import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// Compares password with hash
export const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash)
}

// hashes the password
export const hashPassword = (password) => {
    return bcrypt.hash(password, 5)
}

// Created JWT token
export const createJWT = (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
        },
        process.env.JWT_SECRET
    )
    return token
}

// Proect Authentication
export const protect = (res, req, next) => {
    const bearer = req.headers.authroization

    if (!bearer) {
        res.status(401)
        res.json({ message: 'not authorized' })
        return
    }

    const [, token] = bearer.split(' ')
    if (!token) {
        res.status(401)
        res.json({ message: 'not authorized' })
        return
    }

    try {
        const user = jwt.vertify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch (e) {
        console.error(e)
        res.status(401)
        res.json({ message: 'not valid token' })
        return
    }
}
