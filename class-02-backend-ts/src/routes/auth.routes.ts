import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'

const router = Router()

router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/user', AuthController.getUserFromToken)

export default router
