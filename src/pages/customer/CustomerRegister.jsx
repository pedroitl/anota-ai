import { useState } from "react";
import Logo from "../../components/UI/Logo.jsx";
import { useNavigate } from "react-router-dom";

function CustomerRegister() {
  const navigate = useNavigate();
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState("");

 function validar() {
  if (nomeCompleto.trim() === "") {
    setErro("O nome completo é obrigatório.");
    return false;
  }

  if (email.trim() === "") {
    setErro("O e-mail é obrigatório.");
    return false;
  }

  if (senha.trim() === "") {
    setErro("A senha é obrigatória.");
    return false;
  }

  if (senha.length < 8) {
    setErro("A senha deve ter pelo menos 8 caracteres.");
    return false;
  }

  setErro("");
  return true;
}

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validar()) return;

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nomeCompleto,
          email,
          senha,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar");
      }

      navigate("/login");
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <div className="mx-auto flex flex-col gap-1 w-full p-2 max-w-sm md:max-w-md lg:max-w-lg">
      <div className="flex flex-col items-center gap-2">
        <Logo />
        <h2 className="text-center text-lg md:text-2xl font-bold">Bem-vindo ao Anota Aí</h2>
        <p className="p-2 text-center text-lg md:text-2xl w-full">
          Antes de começar seu pedido, precisamos de algumas informações rápidas
          para garantir um atendimento mais ágil e organizado.
        </p>
      </div>
      
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-start"
      >
        <label htmlFor="nomeCompleto" className="font-semibold text-start">
          Nome Completo:
        </label>
        <input
          type="text"
          id="nomeCompleto"
          value={nomeCompleto}
          onChange={(e) => setNomeCompleto(e.target.value)}
          placeholder="Digite seu nome completo"
          className="border border-gray-300 rounded-md p-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-900 w-full"
        />

        <label htmlFor="e-mail" className="font-semibold text-start">
          E-mail:
        </label>
        <input
          type="email"
          id="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu telefone"
          className="border border-gray-300 rounded-md p-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-900 w-full"
        />

        <label htmlFor="senha" className="font-semibold text-start">
          Senha:
        </label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            className="border border-gray-300 rounded-md p-2 px-4 mb-1 focus:outline-none focus:ring-2 focus:ring-green-900 w-full"
          />
        {erro && <p>{erro}</p>}
        <button
          type="submit"
          className="bg-[#556B2F] w-full text-white rounded-md p-2 mb-4 px-4 mt-4 hover:bg-[#556B2F] focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
        >
          Continuar
        </button>
      </form>
    </div>
  );
}

export default CustomerRegister;
