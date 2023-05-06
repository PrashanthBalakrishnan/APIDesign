import prisma from '../db'
import { comparePassword, createJWT, hashPassword } from '../modules/auth'

// Create new user

export const createNewUser = async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password),
            },
        })
        const token = createJWT(user)
        res.json({ token })
    } catch (e) {
        e.type = 'input'
        next(e)
    }
}

// login
export const login = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        },
    })

    const valid = await comparePassword(req.body.password, user.password)
    if (!valid) {
        res.status(401)
        res.json({ message: 'incorrect username or password' })
        return
    }

    const token = createJWT(user)
    res.json({ token })
}
