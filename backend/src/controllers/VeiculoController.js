import pool from '../config/database.js';

class VeiculoController {

    async criar(req, res) {

        const { placa, modelo, marca, ano, cliente_id } = req.body;

        if (!placa || !modelo || !marca || !ano || !cliente_id) {
            return res.status(400).json({ message: 'Verifique os dados enviados' });
        }

        try {

            const [rows] = await pool.query(
                `INSERT INTO veiculos (placa, modelo, marca, ano, cliente_id) 
                VALUES (?,?,?,?,?)`,
                [placa, modelo, marca, ano, cliente_id]
            );

            res.status(201).json({ message: 'Registro criado com sucesso', id: rows.insertId })
        } catch (error) {
            console.error('Ocorreu um erro', error);
            return res.status(500).json(
                {
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
        }
    }

    async listar(req, res) {
        try {

            const [result] = await pool.query(
                `
                SELECT 
	                v.id, v.placa, v.modelo, v.marca, v.cliente_id, c.nome AS nome_cliente
                FROM veiculos AS v
                JOIN clientes AS c
	                ON v.cliente_id = c.id
                ORDER BY v.id DESC;
                `
            );

            return res.json(result);

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    }
}

export default new VeiculoController();