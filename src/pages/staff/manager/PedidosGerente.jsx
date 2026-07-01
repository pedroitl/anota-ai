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
      console.log("pedidos:", data);
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
      "RECEBIDO",
      "PEDIDO_EM_PREPARO",
      "PEDIDO_CONCLUIDO",
      "ENTREGUE",
      "FINALIZADO",
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
      case "RECEBIDO":
        return "bg-yellow-100 text-yellow-800";
      case "PEDIDO_EM_PREPARO":
        return "bg-orange-100 text-orange-800";
      case "PEDIDO_CONCLUIDO":
        return "bg-blue-100 text-blue-800";
      case "ENTREGUE":
        return "bg-green-100 text-green-800";
      case "FINALIZADO":
        return "bg-stone-200 text-stone-700";
      default:
        return "bg-stone-100 text-stone-700";
    }
  }

  return (
    <section className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-stone-800">Pedidos</h1>
          <p className="mt-1 text-sm text-stone-500">
            Acompanhe e gerencie os pedidos do restaurante.
          </p>
        </div>

        <button
          onClick={listarPedidos}
          className="rounded-lg bg-[#93ad47] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#839a3f]"
        >
          Atualizar
        </button>
      </header>

      {erro && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {erro}
        </div>
      )}

      <div className="rounded-2xl border border-stone-200 bg-[#fcfbf8] shadow-sm">
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
              <thead className="border-b border-stone-200 bg-[#f3eee5]">
                <tr className="text-left">
                  <th className="px-6 py-4 text-sm font-medium text-stone-500">ID</th>
                  <th className="px-6 py-4 text-sm font-medium text-stone-500">Mesa</th>
                  <th className="px-6 py-4 text-sm font-medium text-stone-500">Usuário</th>
                  <th className="px-6 py-4 text-sm font-medium text-stone-500">Status</th>
                  <th className="px-6 py-4 text-sm font-medium text-stone-500">Total</th>
                  <th className="px-6 py-4 text-sm font-medium text-stone-500">Ações</th>
                </tr>
              </thead>

              <tbody>
                {pedidos.map((pedido) => {
                  const status = obterStatus(pedido);

                  return (
                    <tr key={pedido.id} className="border-b border-stone-100 last:border-b-0">
                      <td className="px-6 py-4 text-sm text-stone-700">{pedido.id}</td>
                      <td className="px-6 py-4 text-sm text-stone-700">{obterMesa(pedido)}</td>
                      <td className="px-6 py-4 text-sm text-stone-700">
                        {pedido.nomeUsuario || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-700">
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${corStatus(status)}`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-700">{calcularTotal(pedido)}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => avancarStatus(pedido)}
                            className="rounded-md bg-[#93ad47] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#839a3f]"
                          >
                            Avançar status
                          </button>

                          <button
                            onClick={() => excluirPedido(pedido.id)}
                            className="rounded-md bg-red-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-700"
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