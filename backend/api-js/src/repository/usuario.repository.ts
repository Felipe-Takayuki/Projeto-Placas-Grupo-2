import { Connection } from "mysql2/promise"

export class UserRepository{
    constructor(public db:Connection){}
    async create(user: IUser) {
      const query = "INSERT INTO usuarios(nome, email, senha) VALUES (?,?,?)"
      const values = [user.name, user.email, user.password]
      const [result] = await this.db.query(query,values)
      user.id = (result as any) 
      return result
    }
    async getAll() {
      const query = "SELECT * FROM usuarios"
      const [users] = await this.db.query(query)
      return users as IUser[]
    }
}
