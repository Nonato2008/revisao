import { useState, useEffect } from "react";
import VeiculoForm from "../components/VeiculoForm.jsx";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export default function VeiculosPage() {
    const [clientes, setClientes] = useState([]);
    const [veiculos, setVeiculos] = useState([]);

    const handleSalvar = async (dadosVeiculos) => {

        try {

            const resposta = await fetch('http://localhost:3001/api/veiculos', {
                method: 'POST',
                headers: getAuthHeaders(),
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

                const resposta = await fetch('http://localhost:3001/api/clientes', {
                    headers: getAuthHeaders(),
                })

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