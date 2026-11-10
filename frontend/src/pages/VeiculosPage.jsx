import { useState, useEffect } from "react";
import VeiculoForm from "../components/VeiculoForm.jsx";

// const clienteMockados = [
//     {
//         id: 1,
//         nome: 'Maycon',
//         cpf: "123.456.789-10",
//         telefone: "4003-8922",
//         email: "maycon@gmail.com"
//     },
//     {
//         id: 2,
//         nome: 'Pereira',
//         cpf: "987.456.789-10",
//         telefone: "0800-8922",
//         email: "pereirinha@gmail.com"
//     }
// ]

// const veiculosMockados = [
//     {
//         id: 1,
//         placa: "ABC-1234",
//         modelo: "Palio",
//         marca: "Fiat",
//         ano: 2008,
//         clienteId: 1
//     },
//     {
//         id: 2,
//         placa: "XYZ-1234",
//         modelo: "Jetta",
//         marca: "Volkswagen",
//         ano: 2008,
//         clienteId: 2
//     }
// ]

export default function VeiculosPage() {
    const [clientes, setClientes] = useState([]);
    const [veiculos, setVeiculos] = useState([]);

    const handleSalvar = async (dadosVeiculos) => {

        try {

            const resposta = await fetch('http://localhost:3001/api/veiculos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosVeiculos)
            })

            const data = await resposta.json();

            const novoVeiculo = {
                ...dadosVeiculos,
                id: data.id
            }

            setVeiculos(veiculos => [...veiculos, novoVeiculo])

        } catch (error) {
            console.error('Erro ao criar veículo:', error);
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
            <h3>Gerenciamento de Veículos</h3>

            <VeiculoForm
                clientes={clientes}
                onSalvar={handleSalvar}
            />

            <table>
                <thead>
                    <tr>
                        <th>Placa</th>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>Ano</th>
                        <th>Proprietário</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        veiculos.map(
                            veiculo => (
                                <tr key={veiculo.id}>
                                    <td>{veiculo.placa}</td>
                                    <td>{veiculo.modelo}</td>
                                    <td>{veiculo.marca}</td>
                                    <td>{veiculo.ano}</td>
                                    <td>
                                        {
                                            clientes.map(
                                                cliente => cliente.id == veiculo.cliente_id && cliente.nome
                                            )
                                        }
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