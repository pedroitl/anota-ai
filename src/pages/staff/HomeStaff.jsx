import Logo from "../../components/UI/Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../../users/users.js";

function HomeStaff() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [erro, setErro] = useState("");

    console.log(email);

    function handleSubmit(e) {
        e.preventDefault();
        let userEncontrado = null;

        for(let contador = 0; contador < users.length; contador++) {

            if(users[contador].email === email && users[contador].password === senha) {
                userEncontrado = users[contador];
            } 
        }

        if (userEncontrado) {
            localStorage.setItem("user", JSON.stringify(userEncontrado));
            
            if(userEncontrado.role === "waiter") {
                navigate("/home-funcionario/waiter/mesas");
            } else if(userEncontrado.role === "kitchen") {
                navigate("/home-funcionario/kitchen/pedidos");
            } else if(userEncontrado.role === "cashier") {
                navigate("/home-funcionario/cashier/finalizar");
            } else if(userEncontrado.role === "manager") {
                navigate("/home-funcionario/manager");
            } else {
                setErro("Role do usuário não reconhecida");
            }
        } else {
            setErro("Email ou senha inválidos");
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
            </form>
        </div>
    );
}

export default HomeStaff;