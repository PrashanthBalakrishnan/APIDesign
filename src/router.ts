import { Router } from 'express'
import { body, oneOf, validationResult } from 'express-validator'

const router = Router()

/**
 * PRODUCT
 */

router.get('/products', (req, res) => {})
router.get('/products:id', (req, res) => {})
router.put('/products', body('name').isString, (req, res) => {})
router.post('/products', body('name').isString, (req, res) => {})
router.delete('/products', (req, res) => {})

/**
 * PRODUCT
 */

router.get('/update', (req, res) => {})
router.get('/update:id', (req, res) => {})
router.put(
    '/update',
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS,LIVE,DEPRECATED,ARCHIVED']).optional(),
    body('version').optional(),
    (req, res) => {}
)
router.post(
    '/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    (req, res) => {}
)
router.delete('/update', (req, res) => {})

export default router
