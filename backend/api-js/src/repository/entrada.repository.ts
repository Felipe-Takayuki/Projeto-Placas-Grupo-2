import { Connection } from "mysql2/promise";
import { IGenericRepository } from "./generic.repository";
import { IEntrada } from "../model/entrada.model";
import { ResultSetHeader } from "mysql2";


export class EntradaRepository implements IGenericRepository{
    constructor(public db:Connection){}
    async create(entrada: IEntrada): Promise<any> {
        const query = "INSERT INTO entrada(permitido,placa_id, data_entrada) VALUES (?,?,NOW())"
        const values = [entrada.permitido, entrada.placa_id]
        const [result] = await this.db.query<ResultSetHeader>(query,values) 

        entrada.data_entrada = new Date()
        return entrada
    }
    async update(entrada: IEntrada): Promise<any> {
        const query = `UPDATE entrada SET permitido = ? WHERE placa_id = ?`;
        const values = [entrada.permitido, entrada.placa_id]
        const [result] = await this.db.query(query,values) 
        return entrada
    }
    async delete(placa_id:number): Promise<any> {
      const query = "DELETE FROM entrada WHERE placa_id = ?"
      const [result] = await this.db.query(query, placa_id) 
      return result 
    }
    async getAll(): Promise<any[]> {
      const query = "SELECT * FROM entrada"
      const [entrada] = await this.db.query(query)
      return entrada as IEntrada[]
    }

}