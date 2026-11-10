import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErro("");
        setCarregando(true);

        try {
            const resposta = await fetch("http://localhost:3001/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, senha }),
            });

            const data = await resposta.json();

            if (!resposta.ok) {
                throw new Error(data.error || "Erro ao fazer login.");
            }

            localStorage.setItem("token", data.token);
            navigate("/clientes");
        } catch (error) {
            setErro(error.message || "Não foi possível entrar.");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>E-mail</label>
                <input
                    type="email"
                    placeholder="Digite seu E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Senha</label>
                <input
                    type="password"
                    placeholder="Digite sua Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                <button type="submit" disabled={carregando}>
                    {carregando ? "Entrando..." : "Entrar"}
                </button>

                <div>
                    {erro && <strong>Erro: {erro}</strong>}
                </div>
            </form>
        </div>
    );
}