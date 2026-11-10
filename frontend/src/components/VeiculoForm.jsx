import { useEffect, useState } from "react"

export default function VeiculoForm({
    onSalvar,
    clientes
}) {

    const [formData, setFormData] = useState({
        placa: '',
        modelo: '',
        marca: '',
        ano: '',
        cliente_id: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSalvar(formData)
        setFormData({
            placa: '',
            modelo: '',
            marca: '',
            ano: '',
            cliente_id: ''
        })
    }


    return (
        <div>
            <h5>
                Cadastrar Novo Veículo
            </h5>

            <form>
                <label>Placa Veículo:</label>
                <input type="text" name='placa' value={formData.placa} onChange={handleChange} required />

                <label>Modelo:</label>
                <input type="text" name='modelo' value={formData.modelo} onChange={handleChange} required />

                <label>Marca:</label>
                <input type="text" name='marca' value={formData.marca} onChange={handleChange} required />

                <label>Ano:</label>
                <input type="number" name='ano' value={formData.ano} onChange={handleChange} required />

                <label>Proprietário do Veículo</label>
                <select name="cliente_id" value={formData.cliente_id} onChange={handleChange} required>
                    <option value="">Selecione o Cliente</option>
                    
                    {
                        clientes.map(
                            cliente => (
                                <option key={cliente.id} value={cliente.id}> 
                                {cliente.nome} (CPF: {cliente.cpf})
                                </option>
                            )
                        )
                    }
                </select>

                <button onClick={handleSubmit}>
                    Salvar Veículo
                </button>
            </form>
        </div>
    )
}