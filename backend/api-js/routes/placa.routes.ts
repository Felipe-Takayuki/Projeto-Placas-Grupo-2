
import { Router } from 'express';
import { PlacaRepository } from '../src/repository/placa.repository';
import { PlacaController } from '../src/controller/placa.controller';
import { EntradaRepository } from '../src/repository/entrada.repository';
export function placaRouter(placaRepository: PlacaRepository, entradaRepository: EntradaRepository) {
  const placaController = new PlacaController(placaRepository,entradaRepository)
  const router = Router();
  router.post('/',(req,res) => placaController.create(req, res));
  router.delete('/:id',(req, res)=> placaController.delete(req, res));
  router.put('/', (req, res)=> placaController.update(req, res))
  router.get('/',(req, res) =>  placaController.getAll(req, res));
  return router
}