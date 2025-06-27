import { Connection } from "mysql2/promise";
import { IGenericRepository } from "./generic.repository";
import { IEntrada } from "../model/entrada.model";
import { IUser } from "../model/usuario.model";


export class RepositoryEntrada implements IGenericRepository{
    constructor(public db:Connection) {}
    async create(entrada: IEntrada): Promise<any> {
        const query = "INSERT INTO entrada(placa, data_hora, status_placa) VALUES (?,?,?)"
        const values = [entrada.placa, entrada.data_hora, entrada.status_placa]
        const result = await this.db.query(query,values)
        entrada.id = (result as any)
        return result
    }

    async getAll(): Promise<any[]> {
    const query = "SELECT * FROM entrada"
    const [users] = await this.db.query(query)
    return users as IUser[]
    }



}