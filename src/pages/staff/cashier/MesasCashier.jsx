import { useEffect, useMemo, useState } from "react";
import Logo from "../../../components/UI/Logo";
import SecaoCard from "../../../components/SecaoCard";
import Footer from "../../../components/Footer";
import {useNavigate } from "react-router-dom";

function MesasCashier() {
  const [secoes, setSecoes] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [mesaSelecionada, setMesaSelecionada] = useState(null);

  const navigate = useNavigate();

  const mesas = useMemo(() => secoes.flatMap((secao) => secao.mesas), [secoes]);

  useEffect(() => {
    listarMesas();
  }, []);

  async function listarMesas() {
    try {
      const response = await fetch("http://localhost:8080/mesas");

      if (!response.ok) {
        throw new Error(`Erro ao buscar mesas: ${response.status}`);
      }

      const data = await response.json();
      const secoesAgrupadas = agruparMesasPorSecao(data);
      setSecoes(secoesAgrupadas);
    } catch (error) {
      console.error("Erro ao listar mesas:", error);
    }
  }

  function agruparMesasPorSecao(listaMesas) {
    const mapaSecoes = {};

    listaMesas.forEach((mesa) => {
      const nomeSecao = mesa.secao || "Sem seção";

      if (!mapaSecoes[nomeSecao]) {
        mapaSecoes[nomeSecao] = {
          nome: nomeSecao,
          mesas: [],
        };
      }

      mapaSecoes[nomeSecao].mesas.push({
        id: mesa.id,
        numero: mesa.numeroMesa,
        status: mesa.statusMesa,
        capacidade: mesa.capacidade,
      });
    });

    return Object.values(mapaSecoes);
  }

  function formatarStatusMesa(status) {
    const statusMap = {
      LIVRE: "Livre",
      OCUPADA: "Ocupada",
      AGUARDANDO_PEDIDO: "Aguardando pedido",
      NOVO_PEDIDO: "Novo pedido",
      FECHAMENTO_SOLICITADO: "Fechamento solicitado",
    };

    return statusMap[status] || "Status desconhecido";
  }

  function abrirModal(numeroMesa) {
    setMesaSelecionada(numeroMesa);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setMesaSelecionada(null);
  }

  const mesaAtual = mesas.find((mesa) => mesa.numero === mesaSelecionada);

  const secaoAtual =
    secoes.find((secao) =>
      secao.mesas.some((mesa) => mesa.numero === mesaSelecionada)
    )?.nome || "Sem seção";

  return (
    <div className="min-h-screen bg-[#f5f5f5] w-full box-border overflow-x-hidden flex flex-col justify-between p-4 gap-7 sm:p-8">
      <header className="mb-8 flex flex-col items-center justify-center gap-3">
        <Logo />
        <p className="text-xl sm:text-2xl font-bold text-gray-700 text-center mt-2">
          Visualização de Mesas
        </p>
      </header>

      <main className="grid grid-cols-1 p-6 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
        {secoes.map((secao) => (
          <SecaoCard
            key={secao.nome}
            nome={secao.nome}
            mesas={secao.mesas}
            onMesaClick={abrirModal}
          />
        ))}
      </main>

      {modalAberto && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={fecharModal}
          />

          <div className="absolute right-0 top-0 h-full w-full sm:w-[380px] bg-white shadow-2xl p-6">
            <button
              type="button"
              onClick={fecharModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-2">Mesa {mesaSelecionada}</h2>

            <p className="text-gray-600 mb-4">
              Aqui o caixa pode apenas visualizar as informações da mesa.
            </p>

            <div className="space-y-3">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm text-gray-500">Status atual</p>
                <p className="font-semibold text-gray-800">
                  {formatarStatusMesa(mesaAtual?.status)}
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm text-gray-500">Capacidade</p>
                <p className="font-semibold text-gray-800">
                  {mesaAtual?.capacidade || "-"} pessoas
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm text-gray-500">Seção</p>
                <p className="font-semibold text-gray-800">{secaoAtual}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() =>
                  navigate("/home-funcionario/cashier/finalizar", {
                    state: { mesa: mesaAtual },
                  })
                }
                className="w-full bg-[#556B2F] text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Ir para revisão
              </button>

              <button
                type="button"
                onClick={fecharModal}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default MesasCashier;