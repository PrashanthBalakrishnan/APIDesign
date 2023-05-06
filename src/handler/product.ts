import prisma from '../db'

// get one Product
export const getOneProduct = async (req, res) => {
    const id = req.params.id

    const product = await prisma.product.findFirst({
        where: {
            id,
            belongsToId: req.user.id,
        },
    })

    res.json({ data: product })
}

// get all products
export const getAllProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id,
        },
        include: {
            products: true,
        },
    })

    res.json({ data: user.products })
}

//create a new Product
export const createProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id,
            },
        })
        res.json({ data: product })
    } catch (e) {
        next()
    }
}

//update product
export const updateProduct = async (req, res) => {
    const updated = await prisma.product.update({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id,
            },
        },
        data: {
            name: req.body.name,
        },
    })

    res.json({ data: updated })
}

//update product
export const deleteProduct = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id,
            },
        },
    })

    res.json({ data: deleted })
}
