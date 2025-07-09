import { Request, Response } from 'express';
import { IGenericControler } from './generic.controller';
import { UserRepository } from '../repository/usuario.repository';
import { IUser } from '../model/usuario.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const { sign } = jwt;
const SECRET = process.env.SECRET!;
if (!SECRET) throw new Error("SECRET não definido no .env");

export class UsuarioController implements IGenericControler {
    constructor(public repository: UserRepository) {}

    async create(req: Request, res: Response): Promise<void> {
        const { nome, email, senha } = req.body;

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario: IUser = {
            id: 0,
            name: nome,
            email,
            senha: senhaCriptografada
        };

        const usuarioCriado = await this.repository.create(novoUsuario);
        res.status(201).json(usuarioCriado);
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const usuarios = await this.repository.getAll();
        res.json(usuarios);
    }

    async validacao(req: Request, res: Response): Promise<void> {
        const { email, senha } = req.body;

        const usuario = await this.repository.validacao(email);

        if (!usuario) {
            return res.status(401).json({ message: 'Email não encontrado' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        const token = sign({ userId: usuario.id }, SECRET, {
            expiresIn: '5m' // ou 300 segundos
        });

        return res.json({ auth: true, token });
    }
}
