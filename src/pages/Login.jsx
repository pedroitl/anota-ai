import Logo from "../components/UI/Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [erro, setErro] = useState("");

    console.log(email);

    async function handleSubmit(e) {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:8080/auth/login",{
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({email: email, password: senha})
            })
            if(!response.ok){
                throw new Error("Usuário ou senha invalidos")
            }
            const data = await response.json();

            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("role", data.role);

            switch (data.role) {
                case "ADMIN":
                    window.location.href ="http://localhost:8080/swagger-ui.html";
                    break;

                case "MANAGER":
                    navigate("/home-funcionario/manager/relatorios");
                    break;

                case "CLIENT":
                    navigate("/home-cliente/cardapio");
                    break;
                case "KITCHEN":
                    navigate("/home-funcionario/kitchen/pedidos");
                    break;

                case "WAITER":
                    navigate("/home-funcionario/waiter/mesas");
                    break;

                case "DESK":
                    navigate("/home-funcionario/cashier/mesas");
                    break;

                default:
                    navigate("/");
            }

        }catch(erro){
            setErro(erro.message);
            console.error(erro);

        }
    }

    return (
        <div className="mx-auto flex flex-col gap-1 w-full p-2 max-w-sm md:max-w-md lg:max-w-lg">
            <div className="flex flex-col items-center gap-2" >
                <Logo />
                <h2 className="text-center text-lg md:text-2xl font-bold">Bem-vindo ao Anota Aí</h2>
                <p className="p-2 text-center text-lg md:text-2xl w-full">
                    Digite suas credenciais para continuar.
                </p>
            </div>
            <form 
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-start">
                <label 
                htmlFor="email"
                className="font-semibold text-start">
                    Email:
                </label>
                <input 
                type="email" 
                id="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="border border-gray-300 rounded-md p-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-900 w-full"
                required />
                <label 
                htmlFor="password"
                className="font-semibold text-start">
                    Senha:
                </label>
                <input 
                type="password" 
                id="password" 
                name="password" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                className="border border-gray-300 rounded-md p-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-900 w-full"
                required />
                {erro && <p>{erro}</p>}
                <button 
                type="submit"
                className="bg-[#556B2F] w-full text-white rounded-md p-2 mb-4 px-4 mt-4 hover:bg-[#556B2F] focus:outline-none focus:ring-2 focus:ring-[#556B2F]">
                    Continuar
                </button>
                <a onClick={() => navigate("/cadastro")} className="text-[#556B2F] hover:underline hover:text-[#000000] cursor-pointer text-center w-full">
                    Não tem uma conta? Cadastre-se
                </a>
            </form>
        </div>
    );
}

export default Login;