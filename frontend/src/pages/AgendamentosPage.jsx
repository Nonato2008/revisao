import { useEffect, useState } from "react";
import AgendamentoForm from "../components/AgendamentoForm.jsx";
import AlterarDataFotm from "../components/AlterarDataForm.jsx"

// const agendamentosMockados = [
//     // {
//     //     id: 1,
//     //     veiculoId: 1,
//     //     dataAgendamento: "2026-10-31T09:00:00",
//     //     descricaoServico: "Troca de óleo",
//     //     status: "Agendado"
//     // },
//     // {
//     //     id: 2,
//     //     veiculoId: 2,
//     //     dataAgendamento: "2026-10-31T14:30:00",
//     //     descricaoServico: "Trocar o motor, o último explodiu",
//     //     status: "Agendado"
//     // }
// ]

const veiculosMockados = [
    {
        id: 1,
        placa: "ABC-1234",
        modelo: "Palio",
        marca: "Fiat",
        ano: 2008,
        clienteId: 1
    },
    {
        id: 2,
        placa: "XYZ-1234",
        modelo: "Jetta",
        marca: "Volkswagen",
        ano: 2008,
        clienteId: 2
    }
]

export default function AgendamentosPage() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [veiculos, setVeiculos] = useState(veiculosMockados);

    const handleSalvar = async (dadosAgendamento) => {

        try {

            const resposta = await fetch('http://localhost:3001/api/agendamentos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dadosAgendamento)
                })

                const data = await resposta.json();
            
            const novoAgendamento = {
                ...dadosAgendamento,
                id: data.id
            }

            setAgendamentos(agendamentos => [...agendamentos, novoAgendamento])

        } catch (error) {

            console.error('Erro ao criar agendamento:', error);

        }
    }

    const [ordenacao, setOrdenacao] = useState('dia');

    useEffect(() => {
        const agendamentosOrdenados = [...agendamentos];

        if (ordenacao == "dia") {
            agendamentosOrdenados.sort(
                (a, b) => new Date(a.data_agendamento) - new Date(b.data_agendamento)
            );
        }

        if (ordenacao == "mes") {
            agendamentosOrdenados.sort(
                (a, b) => new Date(a.data_agendamento).getMonth() - new Date(b.data_agendamento).getMonth()
            );
        }

        if (ordenacao == "ano") {
            agendamentosOrdenados.sort(
                (a, b) => new Date(a.data_agendamento).getFullYear() - new Date(b.data_agendamento).getFullYear()
            );
        }

        setAgendamentos(agendamentosOrdenados);

    }, [ordenacao])

    const [agendamentoForm, setAgendamentoForm] = useState(null)

    const handleSalvarNovaData = (novaData) => {
        setAgendamentos(agendamentos.map(
            agendamento => {
                if (agendamento.id == agendamentoForm.id) {
                    return { ...agendamento, dataAgendamento: novaData }
                }

                return agendamento;
            }
        ))
        setAgendamentoForm(null)
    }

    return (
        <div>
            <h3>Gerenciamento de Agendamentos</h3>

            <AgendamentoForm
                veiculos={veiculos}
                onSalvar={handleSalvar}
            />

            <span>Critério de Ordenação</span>
            <button onClick={() => setOrdenacao('dia')}>Por dia</button>
            <button onClick={() => setOrdenacao('mes')}>Por mês</button>
            <button onClick={() => setOrdenacao('ano')}>Por ano</button>

            <table>
                <thead>
                    <tr>
                        <th>Data e Horário</th>
                        <th>Serviço</th>
                        <th>Veículo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        agendamentos.map(
                            agendamento => (
                                <tr key={agendamento.id}>
                                    <td>
                                        {new Date(agendamento.data_agendamento).toLocaleDateString("pt-BR")} |
                                        {new Date(agendamento.data_agendamento).toLocaleTimeString("pt-BR")}
                                    </td>
                                    <td>{agendamento.descricaoServico}</td>
                                    <td>
                                        {
                                            veiculos.map(
                                                veiculo => veiculo.id == agendamento.veiculo_id && `${veiculo.modelo} ${veiculo.placa}`
                                            )
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => setAgendamentoForm(agendamento)}>
                                            Alterar Data
                                        </button>
                                    </td>

                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>

            <AlterarDataFotm
                isOpen={!!agendamentoForm}
                agendamento={agendamentoForm}
                onFechar={() => setAgendamentoForm(null)}
                onSalvar={handleSalvarNovaData}
            />

        </div>
    )

}