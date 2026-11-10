import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from '../src/routes/router.js'

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors({
    origin:['http://localhost:5173', 'http://127.0.0.1.5173', 'http://localhost:3000'],
    credentials: true
}))

//Middlewares  para parsinde corpo e requisição
app.use(express.json());
app.use(cookieParser())

//Rotas da API EX:/api/clientes
app.use('/api', router)

//MiddleWare para  rotas não encontradas
app.use((req,res) => {
    res.status.json (404).json({message:'Recurso não encontrado'});
})

//Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor respondenddo em http://localhost:${PORT}`)
})