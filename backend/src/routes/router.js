import {Router} from 'express';
import ClienteController from '../controllers/ClienteController.js'
import VeiculoController from '../controllers/VeiculoController.js';
import AgendamentoController from '../controllers/AgendamentoController.js';
import DashboardController from '../controllers/DashboardController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import AuthController from '../controllers/AuthController.js';


const router = Router();

//Rotas para a autenticação
router.post('/login', AuthController.login);

router.use(authMiddleware)

router.post('/logout', AuthController.logout);
router.get('/me', AuthController.me);

//ROtas para o cliente
router.get('/clientes', ClienteController.listar)
router.post('/clientes', ClienteController.criar)

//Rotas para veículos
router.post('/veiculos', VeiculoController.criar)
router.get('/veiculos', VeiculoController.listar)

//Rotas para agendamentos
router.post('/agendamentos', AgendamentoController.criar )
router.get('/agendamentos', AgendamentoController.listar)
router.patch('/agendamentos/:id/data', AgendamentoController.editarData)

// Rota para resumo
router.get('/estatisticas', DashboardController.resumo)

export default router;