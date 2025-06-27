import { Request, Response } from 'express';
import { IGenericControler } from './generic.controller';
import { UserRepository } from '../repository/usuario.repository';
import { IUser } from '../model/usuario.model';
import { sign, verify } from 'jsonwebtoken';
import bcrypt, { hash, compare } from 'bcryptjs';

const SECRET = process.env.SECRET


export class UsuarioController implements IGenericControler{

    constructor(public repository: UserRepository){}

    async create(req: Request, res: Response): Promise<void> {
        const { nome, email, senha } = req.body;
        const novoUsuario: IUser = { id: 0, name: nome, email, senha:  senha };
        const usuarioCriado = await this.repository.create(novoUsuario);
        res.json(usuarioCriado);
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const usuarios = await this.repository.getAll();
        res.json(usuarios);
    }

    async validacao(req: Request, res: Response): Promise<void> {
        const { id ,email, senha } = req.body;
        const usuario = await this.repository.validacao(email);
        console.log(usuario)

        if (!usuario) {
            return res.status(401).json({message: 'Email não encontrado'});
        }

        // const senhaValida = await compare(senha, usuario.senha) DEPOIS TEM Q TENTAR FAZER UMA ENCRYPT

        if (senha !== usuario.senha) {
            return res.status(400).json({message: "Senha incorreta"})
        }
        
        const token = sign({userId: usuario.id}, SECRET, {
            expiresIn: 300
        })

        return res.json({auth: true, token})
        
    }
}