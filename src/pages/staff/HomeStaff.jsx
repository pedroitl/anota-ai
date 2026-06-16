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

    async function handleSubmit(e) {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:8080/auth/login",{
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({user: email, password: senha})
            })
            if(!response){
                throw new Error("Usuário ou senha invalidos")
            }
            const token = await response.text();
            localStorage.setItem("token", token);
            navigate("/")

        }catch(erro){

        }
    }

    return (
        <div className="mx-auto flex flex-col gap-1 w-full p-2 max-w-sm md:max-w-md lg:max-w-lg">
            <div className="flex flex-col items-center gap-2" >
                <Logo />
                <h2 className="text-center text-lg md:text-2xl font-bold">Bem-vindo ao Anota Aí</h2>
                
            </div>
        </div>
    );
}

export default HomeStaff;