import { Connection } from "mysql2/promise";
import { IGenericRepository } from "./generic.repository";
import { IEntrada } from "../model/entrada.model";

export class EntradaRepository implements IGenericRepository{
    constructor(public db:Connection){}
    async create(entrada: IEntrada): Promise<any> {
        const query = "INSERT INTO entradas(permitido,placa_id) VALUES (?,?)"
        const values = [entrada.permitido, entrada.placa_id]
        const [result] = await this.db.query(query,values) 
        const [rows] = await this.db.query("SELECT data_entrada FROM entradas WHERE id = ?",[result.insertId])
        entrada.data_entrada = rows[0].data_entrada
        return entrada
    }
    async update(entrada: IEntrada): Promise<any> {
        const query = `UPDATE entradas SET permitido = ? WHERE placa_id = ?`;
        const values = [entrada.permitido, entrada.placa_id]
        const [result] = await this.db.query(query,values) 
        return entrada
    }
    async getAll(): Promise<any[]> {
      const query = "SELECT * FROM entradas"
      const [entrada] = await this.db.query(query)
      return entrada as IEntrada[]
    }

}