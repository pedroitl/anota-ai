import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerRegister() {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [mesa, setMesa] = useState('');

    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    function validar() {
        if (nomeCompleto.trim() === "") {
            setErro("O nome completo é obrigatório.");
            return false;
        }
        if (telefone.trim() === "") {
            setErro("O telefone é obrigatório.");
            return false;
        }
        if (telefone.trim().length > 15 ) {
            setErro("O telefone deve conter no máximo 15 dígitos.");
            return false;
        }
        if (cpf.trim() === "") {
            setErro("O CPF é obrigatório.");
            return false;
        }
        if (cpf.trim().length !== 11) {
            setErro("O CPF deve conter 11 caracteres.");
            return false;
        }
        if (mesa === "") {
            setErro("A seleção de mesa é obrigatória.");
            return false;
        }
        setErro("");
        return true ;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (validar()) {
             navigate("/home");
        }
    };

    return (
        <div className='mx-auto flex flex-col gap-1 items-start max-w-sm w-full p-2'>
            <form onSubmit={handleSubmit} className="w-full">
                <label htmlFor="nomeCompleto" className="font-semibold text-start">Nome Completo:</label>
                <input type="text" id="nomeCompleto" value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)}
                placeholder="Digite seu nome completo" 
                className="border border-gray-300 rounded-md p-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-900 w-full" />

                <label htmlFor="telefone" className="font-semibold  text-start">Telefone:</label>
                <input type="tel" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="Digite seu telefone"
                className="border border-gray-300 rounded-md p-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-900 w-full" />

                <label htmlFor="cpf" className="font-semiboldtext-start">CPF:</label>
                <input type="text" id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="000.000.000-00"
                className="border border-gray-300 rounded-md p-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-900 w-full" />

                <label htmlFor="mesa" className="font-semibold text-start">Mesa:</label>
                <select name="mesa" id="mesa" value={mesa} 
                onChange={(e) => setMesa(e.target.value)} className="border border-gray-300 rounded-md p-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-900 w-full">
                    <option value="">Selecione a mesa</option>
                    <option value="01">Mesa 01</option>
                    <option value="02">Mesa 02</option>
                    <option value="03">Mesa 03</option>
                    <option value="04">Mesa 04</option>
                    <option value="05">Mesa 05</option>
                    <option value="06">Mesa 06</option>
                    <option value="07">Mesa 07</option>
                </select>
                {erro && <p>{erro}</p>}
                <button onClick={validar} type="submit"
                    className="bg-[#556B2F] w-full text-white rounded-md p-2 mb-4 px-4 mt-4 hover:bg-[#556B2F] focus:outline-none focus:ring-2 focus:ring-[#556B2F]">
                    Continuar
                </button>
            </form>
        </div>
        
    );
}

export default CustomerRegister;