import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserRepository } from '../repositories/user.repository'

dotenv.config();

export class AuthService {
    /*
      @body -> objeto con usuario y password
      @return -> token de autetnciación valido
    */
    static async login(body: any) {
	const { usuario, password } = body;
	try {
	    const user = await UserRepository.getByUsername(usuario);
	    if (!user) {
		throw new Error('Usuario no encontrado');
	    }
	    const passValid = await bcrypt.compare(password, user.password);
	    if (!password) {
		throw new Error('Credenciales inválidas');
	    }
	    const token = jwt.sign({
		id: user.id,
		username: user.usuario,
		role: user.rol
	    }, process.env.JWT_SECRET as string, {
		expiresIn: '2h'
	    });
	    return { token, user }
	}catch (error:any) {
	    throw new Error(error.massage);
	}
    }
}
