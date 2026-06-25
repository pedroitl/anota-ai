import { useEffect, useMemo, useState } from "react";
import Logo from "../../../components/UI/Logo";
import SecaoCard from "../../../components/SecaoCard";
import Footer from "../../../components/Footer";

function Mesas() {
  const [secoes, setSecoes] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [mesaSelecionada, setMesaSelecionada] = useState(null);

  const mesas = useMemo(
    () => secoes.flatMap((secao) => secao.mesas),
    [secoes]
  );

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
          mesas: []
        };
      }

      mapaSecoes[nomeSecao].mesas.push({
        id: mesa.id,
        numero: mesa.numeroMesa,
        status: mesa.statusMesa,
        capacidade: mesa.capacidade
      });
    });

    return Object.values(mapaSecoes);
  }

  function abrirModal(numeroMesa) {
    setMesaSelecionada(numeroMesa);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setMesaSelecionada(null);
  }

  async function mudarStatus(numeroMesa, novoStatus) {
    const mesa = mesas.find((m) => m.numero === numeroMesa);

    if (!mesa) return;

    try {
      const response = await fetch(`http://localhost:8080/mesas/${mesa.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          statusMesa: novoStatus
        })
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar status: ${response.status}`);
      }

      await listarMesas();
      fecharModal();
    } catch (error) {
      console.error("Erro ao atualizar status da mesa:", error);
    }
  }

  const mesaAtual = mesas.find((mesa) => mesa.numero === mesaSelecionada);

  return (
    <div className="min-h-screen bg-[#f5f5f5] w-full box-border overflow-x-hidden flex flex-col justify-between p-4 gap-7 sm:p-8">
      <header className="mb-8 flex flex-col items-center justify-center">
        <Logo />
        <p className="text-xl sm:text-2xl font-bold text-gray-700 text-center mt-2">
          Gerenciamento de Mesas
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

            <h2 className="text-2xl font-bold mb-2">
              Mesa {mesaSelecionada}
            </h2>

            <p className="text-gray-600 mb-6">
              Status atual:{" "}
              <span className="font-semibold capitalize">
                {mesaAtual?.status}
              </span>
            </p>

            <div className="flex flex-col gap-3 mb-6">
              <button
                type="button"
                className="bg-[#556B2F] text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
                onClick={() => mudarStatus(mesaSelecionada, "LIVRE")}
              >
                Marcar como Livre
              </button>

              <button
                type="button"
                className="bg-[#7A1F2B] text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
                onClick={() => mudarStatus(mesaSelecionada, "OCUPADA")}
              >
                Marcar como Ocupada
              </button>

              <button
                type="button"
                className="bg-[#B85C38] text-white px-4 py-3 rounded-lg hover:bg-orange-500 transition-colors font-medium"
                onClick={() => mudarStatus(mesaSelecionada, "AGUARDANDO_PEDIDO")}
              >
                Aguardando Pedido
              </button>

              <button
                type="button"
                className="bg-[#C8A44D] text-white px-4 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
                onClick={() => mudarStatus(mesaSelecionada, "NOVO_PEDIDO")}
              >
                Novo Pedido
              </button>

              <button
                type="button"
                className="bg-[#4E5047] text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                onClick={() => mudarStatus(mesaSelecionada, "FECHAMENTO_SOLICITADO")}
              >
                Fechamento Solicitado
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Mesas;