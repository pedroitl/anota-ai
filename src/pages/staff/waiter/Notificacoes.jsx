import Logo from "../../../components/UI/Logo";
import { useState } from "react";

function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([
    {
      id: 1,
      tipo: "ATENDIMENTO",
      mensagem: "Mesa 05 solicitou atendimento",
      lida: false,
      dataHora: "17/06/2026 19:30",
    },
    {
      id: 2,
      tipo: "PEDIDO_PRONTO",
      mensagem: "Pedido da Mesa 03 está pronto",
      lida: false,
      dataHora: "17/06/2026 19:25",
    },
    {
      id: 3,
      tipo: "FECHAMENTO",
      mensagem: "Mesa 08 solicitou fechamento",
      lida: true,
      dataHora: "17/06/2026 19:10",
    },
    {
      id: 4,
      tipo: "ATENDIMENTO",
      mensagem: "Mesa 02 solicitou atendimento",
      lida: false,
      dataHora: "17/06/2026 19:35",
    },
    {
      id: 5,
      tipo: "PEDIDO_PRONTO",
      mensagem: "Pedido da Mesa 07 está pronto",
      lida: true,
      dataHora: "17/06/2026 19:20",
    },
    {
      id: 6,
      tipo: "FECHAMENTO",
      mensagem: "Mesa 01 solicitou fechamento",
      lida: false,
      dataHora: "17/06/2026 19:40",
    },
  ]);

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

  function marcarComoLida(id) {
    setNotificacoes(notificacoes.map(notificacao => 
      notificacao.id === id ? { ...notificacao, lida: true } : notificacao
    ));
  }

  return (
    <div className="min-h-screen w-full p-4 sm:p-8">
      <header className="flex flex-col items-center gap-2">
        <Logo />
        <h1 className="text-center text-lg md:text-2xl font-bold">
          Notificações
        </h1>
      </header>
      <main className="max-w-4xl mx-auto mt-6 flex flex-col gap-4">
        {notificacoes.map((notificacao) => {
            
            const tipoInfo = getTipoInfo(notificacao.tipo);

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
                    <p className="text-sm text-gray-500">{notificacao.dataHora}</p>
                    {!notificacao.lida ? (
                        <button
                            onClick={() => marcarComoLida(notificacao.id)}
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
