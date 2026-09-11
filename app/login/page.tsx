// A diretiva "use client" avisa ao Next.js que este componente 
// deve ser executado no navegador do usuário.
// Isso é obrigatório quando precisamos de interatividade (como lidar com formulários ou botões).
"use client";

// Define e exporta o componente principal da página.
export default function LoginPage() {

    // Esta função é acionada quando o usuário tenta enviar o formulário.
    // O parâmetro 'event' captura todas as informações sobre a ação de submissão.
    function submitForm(event: any){
        console.log(event)
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
            <form onSubmit={submitForm} className="card p-3">
                <div className="mb-3">
                    <label className="form-label">E-mail</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="nome@exemplo.com"
                        required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="••••••••"
                        required />
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