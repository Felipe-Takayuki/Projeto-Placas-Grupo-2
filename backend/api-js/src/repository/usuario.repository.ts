import { Connection } from "mysql2/promise"
import { IUser } from "../model/usuario.model"
import { verify } from "jsonwebtoken"

const SECRET = process.env.SECRET;

export class UserRepository{
    constructor(public db:Connection){}
    async create(user: IUser) {
      const query = "INSERT INTO usuarios(nome, email, senha) VALUES (?,?,?)"
      const values = [user.name, user.email, user.senha]
      const [result] = await this.db.query(query,values)
      user.id = (result as any) 
      return result
    }
    async getAll() {
      const query = "SELECT * FROM usuarios"
      const [users] = await this.db.query(query)
      return users as IUser[]
    }
    async validacao(email: string) {
      const query = "SELECT * FROM usuarios WHERE email = ?"
      const [rows] = await this.db.query(query, [email])
      return (rows as IUser[])[0] || null;
    }
}