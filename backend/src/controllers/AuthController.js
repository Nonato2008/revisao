import jwt from 'jsonwebtoken';
import pool from "../config/database.js"

const JWT_SECRET = process.env.JWT_SECRET;

async function login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Informe o email e a senha' });
    }

    try {

        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?;', [email]);
        const usuario = rows[0];

        // Validação em caso de falha da autenticação
        if (!usuario || usuario.senha != senha) {
            return res.status(401).json({ error: 'E-mailou senha inválidos' });
        }

        // Geração do token JWT  com expiração(ex.: 2h)
        const token = jwt.sign({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
        },
            JWT_SECRET,
            {
                expiresIn: '2h'
            }
        );

        return res.json({
            message: 'Login realizado com sucesso',
            token,
            usario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro no servidor', errorMessage: error.message });
    }
}

export default { login }