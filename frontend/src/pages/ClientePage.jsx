import { useState, useEffect } from "react";
import ClienteForm from "../components/ClienteForm.jsx";

// const clienteMockados = [
//     // {
//     //     id: '1',
//     //     nome: 'Maycon',
//     //     cpf: "123.456.789-10",
//     //     telefone: "4003-8922",
//     //     email: "maycon@gmail.com"
//     // },
//     // {
//     //     id: '2',
//     //     nome: 'Pereira',
//     //     cpf: "987.456.789-10",
//     //     telefone: "0800-8922",
//     //     email: "pereirinha@gmail.com"
//     // }
//F]

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
                    headers: {
                        'Content-Type': 'application/json'
                    },
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

                const resposta = await fetch('http://localhost:3001/api/clientes')

                const data = await resposta.json()

                setClientes(data)

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