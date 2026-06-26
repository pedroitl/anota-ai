import Logo from "../../../components/UI/Logo";
import { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";


function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);

   useEffect( () => {
      listarNotificacoes();
    }, []);

    async function listarNotificacoes() {
    try {
      const response = await fetch("http://localhost:8080/notificacoes")

      if(!response.ok){
        throw new Error("Erro ao buscar notificacao!");
      }

      const data = await response.json();
      setNotificacoes(data);

    } catch(error){
      console.error(error)
    }
  }

  async function marcarNotificacaoComoLida(idNotificacao) {
    try{
      const response = await fetch(`http://localhost:8080/notificacoes/${idNotificacao}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
      }
    );

    console.log("status response:", response.status);

      if(!response.ok){
        throw new Error("erro ao encontrar notificacao!")
      }
      await listarNotificacoes();

    } catch(error){
      console.log(error)
    }
  }

  function formatarDataHora(dataString){
    
    if(!dataString) return "-";

    const data = new Date(dataString)

    return data.toLocaleString("pt-BR",{
      day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
    });


  }


  function getTipoInfo(tipo) {
    switch (tipo) {
      case "ATENDIMENTO":
        return {
          texto: "Atendimento",
          cor: "bg-blue-100 text-blue-600",
        };

      case "PEDIDO_PRONTO":
        return {
          texto: "Pedido Pronto",
          cor: "bg-green-100 text-green-600",
        };

      case "FECHAMENTO":
        return {
          texto: "Fechamento",
          cor: "bg-yellow-100 text-yellow-600",
        };

      default:
        return {
          texto: "Notificação",
          cor: "bg-gray-100 text-gray-600",
        };
    }
  }
  return (
    <div className="min-h-screen w-full p-4 sm:p-8">
      <header className="flex flex-col items-center gap-2">
        <Logo />
        <h1 className="text-center text-lg md:text-2xl font-bold">
          Notificações
        </h1>

        <Link to="/home-funcionario/waiter/mesas"  className="bg-gray-800 text-white px-4 py-2 rounded">
        Ir para mesas
        </Link>

        <Link to= "/home-funcionario/waiter/pedidos" className="bg-gray-800 text-white px-4 py-2 rounded">
          Ir Para Pedidos
      </Link>
      </header>
      <main className="max-w-4xl mx-auto mt-6 flex flex-col gap-4">
        {notificacoes.map((notificacao) => {
            
            const tipoInfo = getTipoInfo(notificacao.tipoNotificacao);

            return (
                <div
                    key={notificacao.id}
                    className={`p-4 rounded-lg mb-2 ${notificacao.lida ? "bg-[#e2e8f0]" : "bg-[#d8e7bf]"} `}
                >
                    <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${tipoInfo.cor}`}
                    >
                    {tipoInfo.texto}
                    </span>
                    <p className="font-semibold">{notificacao.mensagem}</p>
                    <p className="text-sm text-gray-500">{formatarDataHora(notificacao.dataHora)}</p>
                    {!notificacao.lida ? (
                        <button
                            onClick={() => marcarNotificacaoComoLida(notificacao.id)}
                            className="mt-3 px-3 py-2 rounded-lg bg-[#556B2F] text-white text-sm hover:opacity-90"
                        >
                            Marcar como Lida
                        </button>
                    ) : (
                        <span className="mt-2 text-sm text-gray-500">Lida</span>
                    )}
                </div>
            );
        })}
      </main>
    </div>
  );
}

export default Notificacoes;
