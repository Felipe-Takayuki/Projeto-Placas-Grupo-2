
import { Router } from 'express';
import { PlacaRepository } from '../src/repository/placa.repository';
import { PlacaController } from '../src/controller/placa.controller';
export function placaRouter(placaRepository: PlacaRepository) {
  const placaController = new PlacaController(placaRepository)
  const router = Router();
  router.post('/',(req,res) => placaController.create(req, res));
  router.delete('/:id',(req, res)=> placaController.delete(req, res));
  router.put('/', (req, res)=> placaController.update(req, res))
  router.get('/',(req, res) =>  placaController.getAll(req, res));
  return router
}