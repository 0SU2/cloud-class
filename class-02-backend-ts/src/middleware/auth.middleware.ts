import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config();

export const AuthMiddleware = {
    verifiyToken(req: Request, res: Response, next: NextFunction) {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
	    return res.status(400).json({
		error: 'Token no proporcionado'
	    });
	}
	try {
	    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
	    req.body.user = decoded;
	    next();
	} catch (error) {
	    return res.status(401).json({
		error: 'Token Invalido o Expirado'
	    });
	}
    }
};
