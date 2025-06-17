import { Request, Response } from 'express';
import { IGenericControler } from './generic.controller';
import { UserRepository } from '../repository/usuario.repository';

export class UsuarioController implements IGenericControler{

    constructor(public repository: UserRepository){}

    async create(req: Request, res: Response): Promise<void> {
        const { nome, email, senha } = req.body;
        const novoUsuario: IUser = { id: 0, name: nome, email, password:  senha };
        const usuarioCriado = await this.repository.create(novoUsuario);
        res.json(usuarioCriado);
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const usuarios = await this.repository.getAll();
        res.json(usuarios);
    }
}