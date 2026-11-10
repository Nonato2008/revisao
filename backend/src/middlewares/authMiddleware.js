import jwt, { decode } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Faça login para continuar' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Sessão expirada. Faça login novamente' });
        }

        req.ususario = decoded;
        next();
    });
}

export default authMiddleware;