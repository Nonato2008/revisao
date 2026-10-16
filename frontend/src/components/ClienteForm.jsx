import { useEffect, useState } from "react"

export default function ClienteForm({
    clienteEditando,
    onSalvar,
    onCancelar
}) {

    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSalvar(formData)
        setFormData({
            nome: '',
            cpf: '',
            telefone: '',
            email: ''
        })
        onCancelar();
    }

    const handleCancelar = () => {
        setFormData({
            nome: '',
            cpf: '',
            telefone: '',
            email: ''
        })
        onCancelar();
    }

    useEffect(() => {
        if (clienteEditando) {
            setFormData({
                nome: clienteEditando.nome,
                cpf: clienteEditando.cpf,
                telefone: clienteEditando.telefone,
                email: clienteEditando.email
            })
        }
    }, [clienteEditando])

    return (
        <div>
            <h5>
                {clienteEditando ? `Editando Cliente: ${clienteEditando.nome}` : 'Cadastrar Novo Cliente'}
            </h5>

            <form>
                <label>Nome Completo:</label>
                <input type="text" name='nome' value={formData.nome} onChange={handleChange} required />

                <label>CPF:</label>
                <input type="text" name='cpf' value={formData.cpf} onChange={handleChange} required />

                <label>Telefone:</label>
                <input type="text" name='telefone' value={formData.telefone} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name='email' value={formData.email} onChange={handleChange} required />

                {
                    clienteEditando && (
                        <button onClick={handleCancelar}>
                            Cancelar
                        </button>
                    )
                }

                <button onClick={handleSubmit}>
                    Salvar Cliente
                </button>
            </form>
        </div>
    )
}