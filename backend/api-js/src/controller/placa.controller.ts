import { Request, Response } from 'express';
import { PlacaRepository } from '../repository/placa.repository';
import { IGenericControler } from './generic.controller';
import { IPlaca } from '../model/placa.model';

export class PlacaController implements IGenericControler{

    constructor(public repository: PlacaRepository){}

    async create(req: Request, res: Response): Promise<void> {
        const { id, number, motorista,cargo,funcao_cargo,modelo_veiculo, cor_veiculo   } = req.body;
        const novoPlaca: IPlaca = {
            id: id, number: number, motorista: motorista, cargo: cargo, funcao_cargo: funcao_cargo, modelo_veiculo: modelo_veiculo, cor_veiculo: cor_veiculo,
        };
        const PlacaCriado = await this.repository.create(novoPlaca);
        res.json(PlacaCriado);
    }
    async update(req: Request, res: Response):Promise<void> {
        const { id, number, motorista,cargo,funcao_cargo,modelo_veiculo, cor_veiculo   } = req.body;
        const placaAtualizada: IPlaca = {
            id: id, number: number, motorista: motorista, cargo: cargo, funcao_cargo: funcao_cargo, modelo_veiculo: modelo_veiculo, cor_veiculo: cor_veiculo,
        };
        const PlacaAtualizado = await this.repository.update(placaAtualizada)
        res.json(PlacaAtualizado)

    }
    async delete(req:Request, res:Response):Promise<void> {
        const {id} = req.query.id;
        const placaRemovida = await this.repository.delete(id)
        res.json(placaRemovida)
    }
    async getAll(req: Request, res: Response): Promise<void> {
        const Placas = await this.repository.getAll();
        res.json(Placas);
    }
}