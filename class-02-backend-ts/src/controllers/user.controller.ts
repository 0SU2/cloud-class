import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

export const UserController = {
	async create(req: Request, res: Response) {
	try {
	    const id = await UserService.create(req.body);
	    res.status(200).json({ id });
	} catch(error:any) {
	    res.status(400).json({ error: error.message});
	}
    },
    async update(req: Request, res: Response) {
	try {
	    await UserService.update(req.params.id, req.body);
	    res.status(200).json({ message: 'Usuario Borrado Correctamente' });
	} catch(error:any) {
	    res.status(400).json({ error: error.message});
	}
    },
    async delete(req: Request, res: Response) {
	try {
	    await UserService.delete(req.body);
	    res.status(200).json({ message: 'Usuario Actualizado Correctamente' });
	} catch(error:any) {
	    res.status(400).json({ error: error.message});
	}
    },
    async getAll(req: Request, res: Response) {
	try {
	    const users = await UserService.getAll();
	    res.status(200).json({ users });
	} catch(error:any) {
	    res.status(400).json({ error: error.message});
	}
    },
    async getById(req: Request, res: Response) {
	try {
	    const user = await UserService.getById(req.params.id);
	    res.status(200).json({ user });
	} catch(error:any) {
	    res.status(400).json({ error: error.message});
	}
    },
    async getByUsername(req: Request, res: Response) {
	try {
	    const user = await UserService.getByUsername(req.params.username);
	    res.status(200).json({ user });
	} catch(error:any) {
	    res.status(400).json({ error: error.message});
	}
    },
    async getByRoll(req: Request, res: Response) {
	try {
	    const users = await UserService.getByRoll(req.params.username);
	    res.status(200).json({ users });
	} catch(error:any) {
	    res.status(400).json({ error: error.message});
	}
    },
}
