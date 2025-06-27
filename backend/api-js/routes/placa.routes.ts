
import { Router } from 'express';
import { UsuarioController } from '../src/controller/user.controller';
import { PlacaRepository } from '../src/repository/placa.repository';
import { PlacaController } from '../src/controller/placa.controller';
import { verifyJWT } from '../middleware/auth.middleware';
export function placaRouter(placaRepository: PlacaRepository) {
  const userControler = new PlacaController(placaRepository)
  const router = Router();
  router.post('/',(req,res) => userControler.create(req, res));
  router.get('/', verifyJWT,(req, res) =>  userControler.getAll(req, res));
  return router
}