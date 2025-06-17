import { IGenericRepository } from "../repository/generic.repository"

export interface IGenericControler {

    repository: IGenericRepository

    create(req: Request, res: Response): Promise<void>
    getAll(req: Request, res: Response): Promise<void>
    
}