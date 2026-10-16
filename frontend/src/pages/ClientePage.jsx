import { useState } from "react";
import ClienteForm from "../components/ClienteForm.jsx";

const clienteMockados = [
    {
        id: '1',
        nome: 'Maycon',
        cpf: "123.456.789-10",
        telefone: "4003-8922",
        email: "maycon@gmail.com"
    },
    {
        id: '2',
        nome: 'Pereira',
        cpf: "987.456.789-10",
        telefone: "0800-8922",
        email: "pereirinha@gmail.com"
    }
]

export default function ClientePage() {
    const [clientes, setClientes] = useState(clienteMockados);
    const [clienteEditando, setClienteEditando] = useState(null);

    const handleCancelarEdicao = () => {
        setClienteEditando(null);
    }

    const handleSalvar = (dadosClientes) => {
        if (clienteEditando) {
            setClientes(
                clientes =>
                    clientes.map(
                        cliente => cliente.id == clienteEditando.id ? {
                            ...dadosClientes, id: clienteEditando.id
                        } : cliente
                    )
            )
        } else {
            const novoCliente = {
                ...dadosClientes,
                id: Date.now()
            }

            setClientes(clientes => [...clientes, novoCliente])
        }
    }

        return (
            <div>
                <h3>Gerenciamento de Clientes</h3>

                <ClienteForm
                    clienteEditando={clienteEditando}
                    onSalvar={handleSalvar}
                    onCancelar={handleCancelarEdicao}
                />

                <table>
                    <thead>
                        <tr>
                            <th>Nome do Cliente</th>
                            <th>CPF</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clientes.map(
                                cliente => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.cpf}</td>
                                        <td>{cliente.telefone}</td>
                                        <td>{cliente.email}</td>
                                        <td>
                                            <button onClick={() => setClienteEditando(cliente)}>Editar</button>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    
}