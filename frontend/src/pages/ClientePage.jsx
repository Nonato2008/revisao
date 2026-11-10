import { useState, useEffect } from "react";
import ClienteForm from "../components/ClienteForm.jsx";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export default function ClientePage() {
    const [clientes, setClientes] = useState([]);
    const [clienteEditando, setClienteEditando] = useState(null);

    const handleCancelarEdicao = () => {
        setClienteEditando(null);
    }

    const handleSalvar = async (dadosClientes) => {
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

            try {

                const resposta = await fetch('http://localhost:3001/api/clientes', {
                    method: 'POST',
                    headers: getAuthHeaders(),
                    body: JSON.stringify(dadosClientes)
                })

                const data = await resposta.json();

                const novoCliente = {
                    ...dadosClientes,
                    id: data.id
                }

                setClientes(clientes => [...clientes, novoCliente])

            } catch (error) {
                console.error('Erro ao criar cliente:', error);

            }

        }
    }

    useEffect(() => {

        const buscaClientes = async () => {
            try {

                const resposta = await fetch('http://localhost:3001/api/clientes', {
                    headers: getAuthHeaders(),
                });

                const data = await resposta.json();
                setClientes(Array.isArray(data) ? data : []);

            } catch (error) {
                console.error('Erro ao buscar clientes.', error)
            }
        }

        buscaClientes();

    }, [])

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