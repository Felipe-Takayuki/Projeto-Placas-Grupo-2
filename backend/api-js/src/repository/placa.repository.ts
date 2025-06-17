import { Connection } from "mysql2/promise"
import { IGenericRepository } from "./generic.repository"

export class PlacaRepository implements IGenericRepository{
    constructor(public db:Connection){}
    async create(placa: IPlaca) {
      const query = "INSERT INTO placas(placa, motorista, cargo, funcao_cargo, modelo_veiculo, cor_veiculo) VALUES (?,?,?,?,?,?)"
      const values = [placa.number, placa.motorista, placa.cargo, placa.funcao_cargo, placa.modelo_veiculo, placa.cor_veiculo]
      const [result] = await this.db.query(query,values)
      placa.id = (result as any) 
      return result
    }

    async getAll() {
      const query = "SELECT * FROM placas"
      const [users] = await this.db.query(query)
      return users as IUser[]
    }
}
