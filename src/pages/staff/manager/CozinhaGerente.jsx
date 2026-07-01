import Logo from "../../../components/UI/Logo";
import { useEffect, useState } from "react";

function CozinhaGerente() {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [atualizandoId, setAtualizandoId] = useState(null);
  const [filtroAtual, setFiltroAtual] = useState("EM_ANDAMENTO");

  useEffect(() => {
    listarPedidos();
  }, []);

  async function listarPedidos() {
    try {
      setCarregando(true);
      setErro("");

      const response = await fetch("http://localhost:8080/pedidos");

      if (!response.ok) {
        throw new Error(`Erro ao buscar pedidos: ${response.status}`);
      }

      const data = await response.json();
      const listaPedidos = Array.isArray(data) ? data : [];

      setPedidos(listaPedidos);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
      setErro("Não foi possível carregar os pedidos da cozinha do gerente.");
      setPedidos([]);
    } finally {
      setCarregando(false);
    }
  }

  async function atualizarStatusPedido(pedido, novoStatus) {
    try {
      setAtualizandoId(pedido.id);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8080/pedidos/${pedido.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            statusPedido: novoStatus,
          }),
        }
      );

      const texto = await response.text();

      if (!response.ok) {
        throw new Error(`Erro ao atualizar pedido: ${response.status} - ${texto}`);
      }

      await listarPedidos();
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);
      alert("Não foi possível atualizar o status do pedido.");
    } finally {
      setAtualizandoId(null);
    }
  }

  function formatarStatus(status) {
    const statusMap = {
      NOVO_PEDIDO: "Novo pedido",
      PEDIDO_EM_PREPARO: "Pedido em preparo",
      PEDIDO_CONCLUIDO: "Pedido concluído",
      PEDIDO_CANCELADO: "Pedido cancelado",
      PEDIDO_PRONTO: "Pedido pronto",
    };

    return statusMap[status] || status || "Status desconhecido";
  }

  function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function calcularSubtotalItem(item) {
    return Number(item.precoUnitario || 0) * Number(item.quantidade || 0);
  }

  function calcularTotalPedido(pedido) {
    return (pedido.itens || []).reduce((total, item) => {
      return total + calcularSubtotalItem(item);
    }, 0);
  }

  const pedidosFiltrados = pedidos.filter((pedido) => {
    if (filtroAtual === "EM_ANDAMENTO") {
      return (
        pedido.statusPedido === "NOVO_PEDIDO" ||
        pedido.statusPedido === "PEDIDO_EM_PREPARO"
      );
    }

    if (filtroAtual === "PRONTOS") {
      return pedido.statusPedido === "PEDIDO_PRONTO";
    }

    return false;
  });

  const quantidadeEmAndamento = pedidos.filter(
    (pedido) =>
      pedido.statusPedido === "NOVO_PEDIDO" ||
      pedido.statusPedido === "PEDIDO_EM_PREPARO"
  ).length;

  const quantidadeProntos = pedidos.filter(
    (pedido) => pedido.statusPedido === "PEDIDO_PRONTO"
  ).length;

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6">
      <Logo />

      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Cozinha do Gerente
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Acompanhe e gerencie os pedidos da cozinha.
          </p>
        </div>

        
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setFiltroAtual("EM_ANDAMENTO")}
          className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
            filtroAtual === "EM_ANDAMENTO"
              ? "bg-[#556B2F] text-white"
              : "bg-white text-gray-700 border border-gray-300"
          }`}
        >
          Em andamento ({quantidadeEmAndamento})
        </button>

        <button
          type="button"
          onClick={() => setFiltroAtual("PRONTOS")}
          className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
            filtroAtual === "PRONTOS"
              ? "bg-[#556B2F] text-white"
              : "bg-white text-gray-700 border border-gray-300"
          }`}
        >
          Prontos ({quantidadeProntos})
        </button>
      </div>

      {carregando ? (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-gray-600">Carregando pedidos...</p>
        </div>
      ) : erro ? (
        <div className="bg-white p-6 rounded-xl border border-red-200 shadow-sm">
          <p className="text-red-600">{erro}</p>
        </div>
      ) : pedidosFiltrados.length === 0 ? (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-gray-600">
            {filtroAtual === "EM_ANDAMENTO"
              ? "Nenhum pedido em andamento no momento!"
              : "Nenhum pedido pronto no momento!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pedidosFiltrados.map((pedido) => {
            const estaAtualizando = atualizandoId === pedido.id;

            return (
              <div
                key={pedido.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
              >
                <div className="flex justify-between items-center mb-4 gap-3">
                  <h2 className="text-xl font-bold text-gray-800">
                    Mesa {pedido.numeroMesa}
                  </h2>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-bold ${
                      pedido.statusPedido === "NOVO_PEDIDO"
                        ? "bg-[#C8A44D] text-white"
                        : pedido.statusPedido === "PEDIDO_EM_PREPARO"
                          ? "bg-[#B85C38] text-white"
                          : pedido.statusPedido === "PEDIDO_PRONTO"
                            ? "bg-[#556B2F] text-white"
                            : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {formatarStatus(pedido.statusPedido)}
                  </span>
                </div>

                <div className="mb-4 space-y-1">
                  <p className="text-sm text-gray-600">Pedido #{pedido.id}</p>
                  <p className="text-sm text-gray-600">
                    Cliente: {pedido.nomeUsuario || "Não informado"}
                  </p>
                </div>

                {pedido.observacao && (
                  <div className="mb-4 rounded-lg bg-gray-50 border border-gray-200 p-3">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Observação
                    </p>
                    <p className="text-sm text-gray-600">{pedido.observacao}</p>
                  </div>
                )}

                <div className="space-y-3">
                  {(pedido.itens || []).map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between border-b pb-2"
                    >
                      <span>
                        {item.quantidade}x {item.nomeProduto}
                      </span>

                      <span>{formatarMoeda(calcularSubtotalItem(item))}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatarMoeda(calcularTotalPedido(pedido))}</span>
                </div>

                <div className="mt-5 flex flex-wrap justify-end gap-3 border-t border-gray-200 pt-4">
                  {pedido.statusPedido === "NOVO_PEDIDO" && (
                    <button
                      type="button"
                      disabled={estaAtualizando}
                      onClick={() =>
                        atualizarStatusPedido(pedido, "PEDIDO_EM_PREPARO")
                      }
                      className="inline-flex items-center justify-center rounded-lg bg-[#556B2F] px-4 py-2 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#4a5b28] disabled:opacity-60"
                    >
                      {estaAtualizando ? "Atualizando..." : "Aceitar Pedido"}
                    </button>
                  )}

                  {pedido.statusPedido === "PEDIDO_EM_PREPARO" && (
                    <button
                      type="button"
                      disabled={estaAtualizando}
                      onClick={() =>
                        atualizarStatusPedido(pedido, "PEDIDO_PRONTO")
                      }
                      className="inline-flex items-center justify-center rounded-lg bg-[#556B2F] px-4 py-2 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#4a5b28] disabled:opacity-60"
                    >
                      {estaAtualizando
                        ? "Atualizando..."
                        : "Marcar como Pronto"}
                    </button>
                  )}

                  {pedido.statusPedido === "PEDIDO_PRONTO" && (
                    <span className="inline-flex items-center justify-center rounded-lg bg-[#E8F0E3] px-4 py-2 font-semibold text-[#556B2F]">
                      Pedido pronto
                    </span>
                  )}

                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-50"
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CozinhaGerente;