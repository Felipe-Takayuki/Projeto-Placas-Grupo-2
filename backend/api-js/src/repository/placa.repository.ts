import { Connection } from "mysql2/promise"
import { IGenericRepository } from "./generic.repository"
import { IPlaca } from "../model/placa.model"

export class PlacaRepository implements IGenericRepository{
    constructor(public db:Connection){}
    async create(placa: IPlaca) {
      const query = "INSERT INTO placas(placa, motorista, cargo, funcao_cargo, modelo_veiculo, cor_veiculo) VALUES (?,?,?,?,?,?)"
      const values = [placa.number, placa.motorista, placa.cargo, placa.funcao_cargo, placa.modelo_veiculo, placa.cor_veiculo]
      const [result] = await this.db.query(query,values)
      placa.id = (result as any).insertId
      return placa
    }

    async update(placa: IPlaca) {
      const updateData: Record<string, any> = {
        placa: placa.number,
        motorista: placa.motorista,
        cargo: placa.cargo,
        funcao_cargo: placa.funcao_cargo,
        modelo_veiculo: placa.modelo_veiculo,
        cor_veiculo: placa.cor_veiculo,
      };

      if (placa.id !== undefined) {
        updateData["id"] = placa.id;
      }

      const keys = Object.keys(updateData).filter((key) => updateData[key] !== undefined && key !== "id");
      if (keys.length === 0) {
        throw new Error("Nenhum campo fornecido para atualizar.");
      }

      const columns = keys.map((key) => `${key} = ?`).join(", ");
      const values = keys.map((key) => updateData[key]);
      const query = `UPDATE placas SET ${columns} WHERE id = ?`;

      const [result] = await this.db.query(query, [...values, placa.id]);
      return result;
    }


    async delete(id: number) {
      const query = "DELETE FROM placas WHERE id = ?"
      const [result] = await this.db.query(query, id) 
      return result 
    } 

    async getAll() {
      const query = "SELECT * FROM placas"
      const [placas] = await this.db.query(query)
      return placas as IPlaca[]
    }
}
