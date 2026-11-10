import { useEffect, useState } from "react"

export default function AgendamentoForm({
    onSalvar,
    veiculos
}) {

    const [formData, setFormData] = useState({
        veiculo_id: '',
        data_agendamento: '',
        descricao_servico: '',
        status: 'Agendado'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSalvar(formData)
        setFormData({
            veiculo_id: '',
            data_agendamento: '',
            descricao_servico: '',
            status: 'Agendado'
        })
    }


    return (
        <div>
            <h5>
                Cadastrar Agendamento
            </h5>

            <form>
                <label>Veiculo:</label>
                <select name="veiculo_id" value={formData.veiculo_id} onChange={handleChange} required>
                    <option value="">Selecione o Veiculo</option>

                    {
                        veiculos.map(
                            veiculo => (
                                <option key={veiculo.id} value={veiculo.id}>
                                    {veiculo.modelo} - {veiculo.placa}
                                </option>
                            )
                        )
                    }
                </select>
               

                <label>Data e Horário:</label>
                <input type="datetime-local" name='data_agendamento' value={formData.data_agendamento} onChange={handleChange} required />

                <label>Descrição do Serviço:</label>
                <textarea rows="2" name="descricao_servico" value={formData.descricao_servico} onChange={handleChange} required></textarea>

                <button onClick={handleSubmit}>
                    Confirmar Agendamento
                </button>
            </form>
        </div>
    )
}