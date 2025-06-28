import express from 'express';
import cors from 'cors';
import {connect} from './db'
import { Connection } from 'mysql2/promise';
import { UserRepository } from './src/repository/usuario.repository';
import { PlacaRepository } from './src/repository/placa.repository';
import { usuarioRouter } from './routes/user.routes';
import { placaRouter } from './routes/placa.routes';
import { EntradaRepository } from './src/repository/entrada.repository';


const app = express();
app.use(cors());
app.use(express.json())

const port = 3000;
connect().then(db => api(db)).catch(err=>console.error("Falha ao conectar no mysql", err));


// function validarNomeUsuario(req, res, next) {
//   const { name } = req.body
//   if (!name || typeof name !=='string' || name.trim() === '') {
//     return res.status(400).json({erro: "O campo 'name' é obrigatório e deve ser uma string válida"})
//   }
//   next()

function api(db:Connection) {
  const userRepository = new UserRepository(db)
  const placaRepository = new PlacaRepository(db)
  const entradaRepository = new EntradaRepository(db);
  
  app.use("/usuario", usuarioRouter(userRepository))
  app.use("/placa", placaRouter(placaRepository, entradaRepository))

  app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })

}

