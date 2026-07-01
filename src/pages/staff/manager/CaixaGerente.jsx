import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8080";

function CaixaGerente() {
  const [pagamentos, setPagamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    listarPagamentos();
  }, []);

  async function listarPagamentos() {
    try {
      setLoading(true);
      setErro("");

      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/pagamentos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar pagamentos: ${response.status}`);
      }

      const data = await response.json();
      console.log("pagamentos:", data);
      setPagamentos(Array.isArray(data) ? data : []);
    } catch (error) {
      setErro("Erro ao carregar pagamentos.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function obterComanda(pagamento) {
    return pagamento.comanda_id ?? "—";
  }

  function obterMetodo(pagamento) {
    return pagamento.formaPagamento ?? "—";
  }

  function obterValor(pagamento) {
    const valor = Number(pagamento.valor || 0);

    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function obterStatus(pagamento) {
    return pagamento.statusPagamento ?? "PENDENTE";
  }

  async function concluirPagamento(id) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/pagamentos/${id}/concluir`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao concluir pagamento: ${response.status}`);
      }

      listarPagamentos();
    } catch (error) {
      setErro("Erro ao concluir pagamento.");
      console.error(error);
    }
  }

  return (
    <section className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-stone-800">Caixa</h1>
          <p className="mt-1 text-sm text-stone-500">
            Acompanhe e finalize pagamentos do restaurante.
          </p>
        </div>

      </header>

      {erro && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {erro}
        </div>
      )}

      <div className="rounded-2xl border border-stone-200 bg-[#fcfbf8] shadow-sm">
        {loading ? (
          <div className="p-6">
            <p className="text-sm text-stone-500">Carregando pagamentos...</p>
          </div>
        ) : pagamentos.length === 0 ? (
          <div className="p-6">
            <p className="text-sm text-stone-500">
              Nenhum pagamento encontrado.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-stone-200 bg-[#f3eee5]">
                <tr className="text-left">
                  <th className="px-6 py-4 text-sm font-medium text-stone-500">Comanda</th>
                  <th className="px-6 py-4 text-sm font-medium text-stone-500">Data</th>
                  <th className="px-6 py-4 text-sm font-medium text-stone-500">Método</th>
                  <th className="px-6 py-4 text-sm font-medium text-stone-500">Valor</th>
                  <th className="px-6 py-4 text-sm font-medium text-stone-500">Status</th>
                  <th className="px-6 py-4 text-sm font-medium text-stone-500">Ação</th>
                </tr>
              </thead>

              <tbody>
                {pagamentos.map((pagamento, index) => {
                  const status = obterStatus(pagamento);

                  return (
                    <tr key={index} className="border-b border-stone-100 last:border-b-0">
                      <td className="px-6 py-4 text-sm text-stone-700">
                        {obterComanda(pagamento)}
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-700">
                        {pagamento.dataHora
                          ? new Date(pagamento.dataHora).toLocaleString("pt-BR")
                          : "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-700">
                        {obterMetodo(pagamento)}
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-700">
                        {obterValor(pagamento)}
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-700">
                        {status}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => concluirPagamento(pagamento.comanda_id)}
                          disabled={status === "CONCLUIDO"}
                          className="rounded-md bg-[#93ad47] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#839a3f] disabled:cursor-not-allowed disabled:bg-stone-300"
                        >
                          Concluir
                        </button>
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

export default CaixaGerente;