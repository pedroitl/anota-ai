import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8080";

function PedidosGerente() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    listarPedidos();
  }, []);

  async function listarPedidos() {
    try {
      setLoading(true);
      setErro("");

      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/pedidos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar pedidos: ${response.status}`);
      }

      const data = await response.json();
      setPedidos(Array.isArray(data) ? data : []);
    } catch (error) {
      setErro("Erro ao carregar pedidos.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function obterMesa(pedido) {
    return pedido.numeroMesa ?? "—";
  }

  function obterStatus(pedido) {
    return pedido.statusPedido ?? "—";
  }

  function formatarStatusBonito(status) {
    if (!status || status === "—") return "—";
    return status.replace(/_/g, " ");
  }

  function calcularTotal(pedido) {
    const itens = Array.isArray(pedido.itens) ? pedido.itens : [];

    const total = itens.reduce((acc, item) => {
      const quantidade = Number(item.quantidade || 0);
      const preco = Number(item.precoUnitario || 0);
      return acc + quantidade * preco;
    }, 0);

    return total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function proximoStatus(statusAtual) {
    const fluxo = [
      "NOVO_PEDIDO",
      "PEDIDO_EM_PREPARO",
      "PEDIDO_PRONTO",
    ];

    const index = fluxo.indexOf(statusAtual);
    if (index === -1 || index === fluxo.length - 1) return statusAtual;
    return fluxo[index + 1];
  }

  async function avancarStatus(pedido) {
    const statusAtual = obterStatus(pedido);
    const novoStatus = proximoStatus(statusAtual);

    if (novoStatus === statusAtual) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/pedidos/${pedido.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          statusPedido: novoStatus,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar status: ${response.status}`);
      }

      listarPedidos();
    } catch (error) {
      setErro("Erro ao atualizar status do pedido.");
      console.error(error);
    }
  }

  async function excluirPedido(id) {
    const confirmou = window.confirm("Deseja excluir este pedido?");
    if (!confirmou) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/pedidos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao excluir pedido: ${response.status}`);
      }

      listarPedidos();
    } catch (error) {
      setErro("Erro ao excluir pedido.");
      console.error(error);
    }
  }

  function corStatus(status) {
    switch (status) {
      case "NOVO_PEDIDO":
        return "bg-[#efe4bf] text-[#7a5d14]";
      case "PEDIDO_EM_PREPARO":
        return "bg-[#eed7cd] text-[#8a4b2f]";
      case "PEDIDO_PRONTO":
        return "bg-[#dfe8d7] text-[#556B2F]";
      default:
        return "bg-stone-100 text-stone-700";
    }
  }

  const totalPedidos = pedidos.length;
  const pedidosNovos = pedidos.filter(
    (pedido) => pedido.statusPedido === "NOVO_PEDIDO"
  ).length;
  const pedidosPreparo = pedidos.filter(
    (pedido) => pedido.statusPedido === "PEDIDO_EM_PREPARO"
  ).length;
  const pedidosProntos = pedidos.filter(
    (pedido) => pedido.statusPedido === "PEDIDO_PRONTO"
  ).length;

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-800">Pedidos</h1>
          <p className="mt-1 text-sm text-stone-500">
            Visualize e acompanhe os pedidos do restaurante.
          </p>
        </div>

        
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-stone-500">Total de pedidos</p>
          <h2 className="mt-2 text-2xl font-bold text-stone-800">{totalPedidos}</h2>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-stone-500">Novos</p>
          <h2 className="mt-2 text-2xl font-bold text-[#7a5d14]">{pedidosNovos}</h2>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-stone-500">Em preparo</p>
          <h2 className="mt-2 text-2xl font-bold text-[#8a4b2f]">{pedidosPreparo}</h2>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-stone-500">Prontos</p>
          <h2 className="mt-2 text-2xl font-bold text-[#556B2F]">{pedidosProntos}</h2>
        </div>
      </div>

      {erro && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {erro}
        </div>
      )}

      <div className="rounded-2xl border border-stone-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-6">
            <p className="text-sm text-stone-500">Carregando pedidos...</p>
          </div>
        ) : pedidos.length === 0 ? (
          <div className="p-6">
            <p className="text-sm text-stone-500">Nenhum pedido encontrado.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-stone-200 bg-[#f7f3ec]">
                <tr className="text-left">
                  <th className="px-6 py-4 text-sm font-semibold text-stone-500">Pedido</th>
                  <th className="px-6 py-4 text-sm font-semibold text-stone-500">Mesa</th>
                  <th className="px-6 py-4 text-sm font-semibold text-stone-500">Cliente</th>
                  <th className="px-6 py-4 text-sm font-semibold text-stone-500">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-stone-500">Total</th>
                  <th className="px-6 py-4 text-sm font-semibold text-stone-500">Ações</th>
                </tr>
              </thead>

              <tbody>
                {pedidos.map((pedido) => {
                  const status = obterStatus(pedido);

                  return (
                    <tr
                      key={pedido.id}
                      className="border-b border-stone-100 transition-colors hover:bg-[#faf8f4] last:border-b-0"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-stone-800">
                        #{pedido.id}
                      </td>

                      <td className="px-6 py-4 text-sm text-stone-700">
                        Mesa {obterMesa(pedido)}
                      </td>

                      <td className="px-6 py-4 text-sm text-stone-700">
                        {pedido.nomeUsuario || "—"}
                      </td>

                      <td className="px-6 py-4 text-sm text-stone-700">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${corStatus(
                            status
                          )}`}
                        >
                          {formatarStatusBonito(status)}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-stone-700">
                        {calcularTotal(pedido)}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {status !== "PEDIDO_PRONTO" && (
                            <button
                              onClick={() => avancarStatus(pedido)}
                              className="rounded-lg bg-[#556B2F] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#4a5b28]"
                            >
                              Avançar status
                            </button>
                          )}

                          <button
                            onClick={() => excluirPedido(pedido.id)}
                            className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-700 transition hover:bg-red-50"
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default PedidosGerente;