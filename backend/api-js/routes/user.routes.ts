import { Router } from 'express';
import { UserRepository } from '../src/repository/usuario.repository';
import { UsuarioController } from '../src/controller/user.controller';
export function usuarioRouter(usuarioRepository: UserRepository) {
  const userControler = new UsuarioController(usuarioRepository)
  const router = Router();
  router.post('/',(req, res) => userControler.create(req, res) );
  router.get('/',(req, res) => userControler.getAll(req, res));
  return router
}