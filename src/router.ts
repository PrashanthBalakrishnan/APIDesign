import { Router } from 'express'
import { body, oneOf, validationResult } from 'express-validator'
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
} from './handler/product'
import { handleInputErrors } from './modules/middleware'
import {
    createUpdate,
    deleteUpdate,
    getOneUpdate,
    getUpdates,
    updateUpdate,
} from './handler/update'

const router = Router()

/**
 * PRODUCT
 */

router.get('/product', getAllProducts)
router.get('/product/:id', getOneProduct)
router.put(
    '/product/:id',
    body('name').isString(),
    handleInputErrors,
    updateProduct
)
router.post(
    '/product',
    body('name').isString(),
    handleInputErrors,
    createProduct
)
router.delete('/product/:id', deleteProduct)

/**
 * PRODUCT
 */

router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put(
    '/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS,LIVE,DEPRECATED,ARCHIVED']).optional(),
    body('version').optional(),
    updateUpdate
)
router.post(
    '/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate
)
router.delete('/update/:id', deleteUpdate)

export default router
