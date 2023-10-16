import express from 'express'
import BowlsController from '../controllers/bowls.js'

const router = express.Router()

router.get('/', BowlsController.getBowls)

router.get('/:bowlId', BowlsController.getBowlById)

router.post('/', BowlsController.createBowl)

router.delete('/:id', BowlsController.deleteBowl)

router.patch('/:id', BowlsController.updateBowl)


export default router
