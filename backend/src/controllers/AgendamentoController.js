import pool from '../config/database.js';
import cryptoService from '../utils/crypto.js';


class AgendamentoController {

    async listar(req, res) {
        const { ordernarPor } = req.query; //dia, mês ou ano

        try {
            
            const sql = `
            SELECT  
	            a.id, a.data_agendamento, a.descricao_servico, a.status,
                c.id as id_cliente, c.nome, c.cpf, c.telefone, c.email,
                v.id as id_veiculo, v.placa, v.modelo, v.marca, v.ano
            FROM agendamentos AS a
            JOIN veiculos AS v 
	            ON a.veiculo_id = v.id
            JOIN  clientes AS c 
	            ON v.cliente_id = c.id
            ORDER BY a.data_agendamento ASC;
            `;

            const [rows] = await pool.query(sql);

            rows.forEach((row)=>{
                row.cpf = cryptoService.decrypt(row.cpf)
            })

            return res.json(rows)

        } catch (error) {
            console.error('Ocorreu um erro', error);
            return res.status(500).json(
                {
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
        }
    }

    async criar(req, res) {

        const { data_agendamento, descricao_servico, veiculo_id, status } = req.body;

        if (!data_agendamento || !descricao_servico || !veiculo_id || !status) {
            return res.status(400).json({ message: 'Verifique os dados enviados' });
        }

        try {

            const [rows] = await pool.query(
                `INSERT INTO agendamentos (data_agendamento, descricao_servico, veiculo_id, status) 
                VALUES (?,?,?,?)`,
                [data_agendamento, descricao_servico, veiculo_id, status]
            );

            res.status(201).json({message: 'Registro criado com sucesso', id:rows.insertId})
        } catch (error) {
            console.error('Ocorreu um erro', error);
            return res.status(500).json(
                {
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
        }
    }

    async editarData(req, res) {
        const {id} = req.params;
        const {nova_data} = req.body;

        if(!nova_data){
                return res.status(400).json({error: 'Verifique o valor enviado para a nova data'})
        }

        try {

            const [result] = await pool.query(
                `UPDATE agendamentos set data_agendamento = ? WHERE id=?;`,
                [nova_data, id]
            );
            return res.json({message: 'Registro alterado com sucesso'});
        } catch (error) {
            console.error('Ocorreu um erro', error);
            return res.status(500).json(
                {
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
        }
    }

}

export default new AgendamentoController();