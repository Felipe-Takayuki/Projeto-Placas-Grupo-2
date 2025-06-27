
import { Router } from 'express';
import { RepositoryEntrada } from '../src/repository/entrada.repository';
import { EntradaController } from '../src/controller/entrada.controller';
export function entradaRouter(placaRepository: RepositoryEntrada) {
  const entradaControler = new EntradaController(placaRepository)
  const router = Router();
  router.post('/',(req,res) => entradaControler.create(req, res));
  router.get('/',(req, res) =>  entradaControler.getAll(req, res));
  router.get('/:id', (req,res) => entradaControler.verification(req, res));
  return router
}