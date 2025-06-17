import { Connection } from "mysql2/promise"

export interface IGenericRepository {

    db: Connection

    create(entidade: any): Promise<any>
    getAll(): Promise<any[]>
    
}