import { Request, Response } from 'express';
import { PlacaRepository } from '../repository/placa.repository';
import { IGenericControler } from './generic.controller';
import { IPlaca } from '../model/placa.model';
import { IEntrada } from '../model/entrada.model';
import { EntradaRepository } from '../repository/entrada.repository';

export class PlacaController implements IGenericControler{

    constructor(public repository: PlacaRepository, public entrada_repository: EntradaRepository){}

    async create(req: Request, res: Response): Promise<void> {
        const {number, motorista,cargo,funcao_cargo,modelo_veiculo, cor_veiculo, permitido} = req.body;
        const novoPlaca: IPlaca = {
            id: 0, number: number, motorista: motorista, cargo: cargo, funcao_cargo: funcao_cargo, modelo_veiculo: modelo_veiculo, cor_veiculo: cor_veiculo,
        };

        const PlacaCriado = await this.repository.create(novoPlaca);
        const novaEntrada : IEntrada = {
            permitido: permitido,
            placa_id: PlacaCriado.id
        }
        const RegistroEntrada = await this.entrada_repository.create(novaEntrada)
        res.json({placa: PlacaCriado, entrada: RegistroEntrada });
    }
    async update(req: Request, res: Response):Promise<void> {
        const { id, number, motorista,cargo,funcao_cargo,modelo_veiculo, cor_veiculo, permitido } = req.body;
        
        const placaAtualizada: IPlaca = {
            id: id, number: number, motorista: motorista, cargo: cargo, funcao_cargo: funcao_cargo, modelo_veiculo: modelo_veiculo, cor_veiculo: cor_veiculo,
        };
        
        const entradaAtualizada: IEntrada = {
            permitido: permitido,
            placa_id: id
        }
        const campos = [number, motorista, cargo, funcao_cargo, modelo_veiculo, cor_veiculo];

        const algumCampoPreenchido = campos.some(campo => typeof campo === 'string' && campo.trim() !== '');

        let PlacaAtualizado = null
        if (algumCampoPreenchido) {
            PlacaAtualizado = await this.repository.update(placaAtualizada)
        }

        let EntradaAtulizada = null
        if (permitido != null) {
            EntradaAtulizada = await this.entrada_repository.update(entradaAtualizada)
        }
        res.json({
            placaAtualizada, entradaAtualizada
        })

    }
    async delete(req:Request, res:Response):Promise<void> {
        const idStr = req.params.id;

        if (!idStr) {
        return res.status(400).json({ erro: "Parâmetro 'id' não informado" });
        }

        const id = parseInt(idStr, 10);

        if (isNaN(id)) {
        return res.status(400).json({ erro: "Parâmetro 'id' inválido" });
        }

        const entradaRemovida = await this.entrada_repository.delete(id)
        const placaRemovida = await this.repository.delete(id)
            res.json({placaRemovida, entradaRemovida})
    }
    async getAll(req: Request, res: Response): Promise<void> {
        const Placas = await this.repository.getAll();
        res.json(Placas);
    }
}