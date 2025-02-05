import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'

export const AuthController = {
    async login(req: Request, res: Response) {
	try{
	    const { token, user } = await AuthService.login(req.body);
	    res.status(200).json({
		token,
		user
	    });
	} catch(error:any) {
	    res.status(401).json({
		error: error.message
	    });
	}
    },
    logout(req: Request, res: Response) {
	// Investigar una logica para invalidar el token o destruirlo
	res.status(200).json({
	    message: 'Sesión cerrada correctamente'
	});
    },
    getUserFromToken(req: Request, res: Response) {
	res.status(200).json({
	    user: req.body.user
	});
    }
}
