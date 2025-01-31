import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { AuthMiddleware } from '../middleware/auth.middleware'

const router = Router();

// Indicar que vamos a usar el middleware
router.use(AuthMiddleware.verifyToken);

// Definicion de Rutas para el usuario
router.post('/create', UserController.create);
router.put('/update:id', UserController.update);
router.delete('/delete:id', UserController.delete);
router.get('/getall', UserController.getAll);
router.get('/getbyid/:id', UserController.getById);
router.get('/getbyusername/:username', UserController.getByUsername);
router.get('/getbyrol/:rol', UserController.getByRol);

export default router;
