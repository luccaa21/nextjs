// A diretiva "use client" avisa ao Next.js que este componente 
// deve ser executado no navegador do usuário.
// Isso é obrigatório quando precisamos de interatividade (como lidar com formulários ou botões).
"use client";

import { useState } from "react";
import { saveToken } from "./auth.service";
import { useRouter } from "next/navigation";

// Define e exporta o componente principal da página.
export default function LoginPage() {

    const router = useRouter();

    // 'useState' avisa o HTML que a variável foi atualizada e a tela deve ser atualizada novamente
    // showPassword é a variável
    // setShowPassword é a função dela
    // dentro do 'useState' vai o valor inicial
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Esta função é acionada quando o usuário tenta enviar o formulário.
    // O parâmetro 'event' captura todas as informações sobre a ação de submissão.
    async function submitForm(event: any){
        console.log(event)
        // pausa a submissão do form - não atualiza a pagina
        event.preventDefault();
        
        // limpa a variável de erro
        setError("");

        // fazer uma request via http post para a API backend 
        var response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            // classe padrão que transforma para json
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        // o ".ok" aceita toda a faixa de 200-299(ou seja aqui é qualquer erro)
        if (!response.ok){
            var e = await response.json();
            setError(e.message);
            return;
        }

        // converte a resposta para a variável 'data'
        const data = await response.json();

        console.log(data.acess_token);

        // substituído: localStorage.setItem("acess_token", data.acess_token);
        saveToken(data.acess_token);

        // redirecionar
        router.replace("/admin");

    }
    
    // O retorno (return) define a interface visual que será desenhada na tela.
    return (
        // Um contêiner (container) para agrupar tudo, aplicando espaçamentos (py-5).
        <div className="container py-5">
            <h1 className="mb-3">Login</h1>

            {
            // O formulário principal. 
            // A propriedade 'onSubmit' liga a ação de enviar o formulário 
            // à nossa função 'submitForm' criada acima.
            }

            {error != "" && (
                <p> {error} </p>
            )}

            <form onSubmit={submitForm} className="card p-3">
                <div className="mb-3">
                    <label className="form-label">E-mail</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        placeholder="nome@exemplo.com"
                        required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Senha</label>
                    <div className="input-group">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="••••••••"
                            required />
                        <div className="input-group-append">
                            <button
                                onClick={()=> setShowPassword(!showPassword)}
                                type="button" 
                                className="btn btn-outline-secondary">
                                    {showPassword ? (
                                        <i className="bi bi-eye"></i>
                                    ) : (
                                        <i className="bi bi-eye-slash"></i>
                                    )}
                            </button>
                        </div>
                    </div>
                </div>
                {
                // Este botão, por ter type="submit", avisa ao formulário 
                // que é hora de acionar o 'onSubmit'.
                }
                <button className="btn btn-dark" type="submit">
                    Entrar
                </button>
            </form>
        </div>
    );
}