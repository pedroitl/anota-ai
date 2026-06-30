import { useEffect, useMemo, useState } from "react";
import SecaoCard from "../../../components/SecaoCard";

const BASE_URL = "http://localhost:8080";

function MesasGerente() {
  const [secoes, setSecoes] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [mesaSelecionada, setMesaSelecionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const mesas = useMemo(() => secoes.flatMap((secao) => secao.mesas), [secoes]);

  useEffect(() => {
    listarMesas();
  }, []);

  async function listarMesas() {
    try {
      setLoading(true);
      setErro("");

      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/mesas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar mesas: ${response.status}`);
      }

      const data = await response.json();
      const secoesAgrupadas = agruparMesasPorSecao(data);
      setSecoes(secoesAgrupadas);
    } catch (error) {
      setErro("Erro ao listar mesas.");
      console.error("Erro ao listar mesas:", error);
    } finally {
      setLoading(false);
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
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/mesas/${mesa.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          statusMesa: novoStatus,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar status: ${response.status}`);
      }

      await listarMesas();
      fecharModal();
    } catch (error) {
      setErro("Erro ao atualizar status da mesa.");
      console.error("Erro ao atualizar status da mesa:", error);
    }
  }

  const mesaAtual = mesas.find((mesa) => mesa.numero === mesaSelecionada);

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Mesas</h1>
          <p className="text-sm text-stone-500">
            Visualize e altere o status das mesas do restaurante.
          </p>
        </div>

        <button
          onClick={listarMesas}
          className="w-fit rounded-lg bg-[#556B2F] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          Atualizar
        </button>
      </header>

      {erro && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {erro}
        </div>
      )}

      {loading ? (
        <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-stone-500">Carregando mesas...</p>
        </div>
      ) : (
        <main className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {secoes.map((secao) => (
            <SecaoCard
              key={secao.nome}
              nome={secao.nome}
              mesas={secao.mesas}
              onMesaClick={abrirModal}
            />
          ))}
        </main>
      )}

      {modalAberto && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={fecharModal} />

          <div className="absolute right-0 top-0 h-full w-full bg-white p-6 shadow-2xl sm:w-[380px]">
            <button
              type="button"
              onClick={fecharModal}
              className="absolute right-4 top-4 text-2xl font-bold text-gray-500 hover:text-gray-700"
            >
              ×
            </button>

            <h2 className="mb-2 text-2xl font-bold">Mesa {mesaSelecionada}</h2>

            <p className="mb-6 text-gray-600">
              Status atual:{" "}
              <span className="font-semibold capitalize">
                {mesaAtual?.status}
              </span>
            </p>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="rounded-lg bg-[#556B2F] px-4 py-3 font-medium text-white transition-colors hover:bg-green-700"
                onClick={() => mudarStatus(mesaSelecionada, "LIVRE")}
              >
                Marcar como Livre
              </button>

              <button
                type="button"
                className="rounded-lg bg-[#7A1F2B] px-4 py-3 font-medium text-white transition-colors hover:bg-red-700"
                onClick={() => mudarStatus(mesaSelecionada, "OCUPADA")}
              >
                Marcar como Ocupada
              </button>

              <button
                type="button"
                className="rounded-lg bg-[#B85C38] px-4 py-3 font-medium text-white transition-colors hover:bg-orange-600"
                onClick={() => mudarStatus(mesaSelecionada, "AGUARDANDO_PEDIDO")}
              >
                Aguardando Pedido
              </button>

              <button
                type="button"
                className="rounded-lg bg-[#C8A44D] px-4 py-3 font-medium text-white transition-colors hover:bg-yellow-500"
                onClick={() => mudarStatus(mesaSelecionada, "NOVO_PEDIDO")}
              >
                Novo Pedido
              </button>

              <button
                type="button"
                className="rounded-lg bg-[#4E5047] px-4 py-3 font-medium text-white transition-colors hover:bg-gray-600"
                onClick={() =>
                  mudarStatus(mesaSelecionada, "FECHAMENTO_SOLICITADO")
                }
              >
                Fechamento Solicitado
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MesasGerente;