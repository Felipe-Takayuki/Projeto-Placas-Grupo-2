import { Request, Response } from 'express';
import { RepositoryEntrada } from '../repository/entrada.repository';
import { IGenericControler } from './generic.controller';
import { IEntrada } from '../model/entrada.model';

export class EntradaController implements IGenericControler{

    constructor(public repository: RepositoryEntrada){}

    async create(req: Request, res: Response): Promise<void> {
        const { id, placa, data_hora, status_placa   } = req.body;
        const novaEntrada: IEntrada = {
            id: id, placa: placa, data_hora: data_hora, status_placa: status_placa,  
        };
        const EntradaCriado = await this.repository.create(novaEntrada);
        res.json(EntradaCriado);
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const Entrada = await this.repository.getAll();
        res.json(Entrada);
    }

    async verification(req: Request, res: Response): Promise<void> {
        const query = "SELECT * FROM entrada WHERE id = ?"

        const { id } = req.params

        if (!id) {
            res.status(400).json({error: "Id nao encontrado"});
            return;
        }

        const [output] = await this.repository.db.query(query, [id]);

        if ((output as any[]).length === 0 ) {
            res.status(404).json({error: "Id nao encontrado"})
        } else {
            res.json((output as any[])[0]);
        }
    }
}