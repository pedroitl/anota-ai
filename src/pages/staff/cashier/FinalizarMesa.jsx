import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../components/UI/Logo";
import Footer from "../../../components/Footer";

function FinalizarMesa() {
  const location = useLocation();
  const navigate = useNavigate();

  const mesa = location.state?.mesa;

  const [pedidosMesa, setPedidosMesa] = useState([]);
  const [pagamentosMesa, setPagamentosMesa] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [confirmandoPagamento, setConfirmandoPagamento] = useState(false);

  useEffect(() => {
    if (!mesa) {
      setCarregando(false);
      return;
    }

    buscarDadosMesa();
  }, [mesa]);

  async function buscarDadosMesa() {
    try {
      const [responsePedidos, responsePagamentos] = await Promise.all([
        fetch("http://localhost:8080/pedidos"),
        fetch("http://localhost:8080/pagamentos"),
      ]);

      if (!responsePedidos.ok) {
        throw new Error("Erro ao buscar pedidos!");
      }

      if (!responsePagamentos.ok) {
        throw new Error("Erro ao buscar pagamentos!");
      }

      const pedidos = await responsePedidos.json();
      const pagamentos = await responsePagamentos.json();

      const pedidosFiltrados = pedidos.filter(
        (pedido) => pedido.numeroMesa === mesa.numero,
      );

      setPedidosMesa(pedidosFiltrados);

      const idsComandaDaMesa = pedidosFiltrados
        .map(
          (pedido) =>
            pedido.comanda_id ?? pedido.comandaId ?? pedido.comanda?.id,
        )
        .filter(Boolean);

      const pagamentosFiltrados = pagamentos.filter((pagamento) =>
        idsComandaDaMesa.includes(
          pagamento.comanda_id ?? pagamento.comandaId ?? pagamento.comanda?.id,
        ),
      );

      setPagamentosMesa(pagamentosFiltrados);
    } catch (error) {
      console.warn("Backend indisponível. Buscando comanda pelo localStorage.");
      buscarDadosMesaLocalStorage();
    } finally {
      setCarregando(false);
    }
  }

  function buscarDadosMesaLocalStorage() {
    const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos")) || [];

    const pedidosFiltrados = pedidosSalvos.filter(function (pedido) {
      return (
        pedido.mesa === mesa.numero &&
        pedido.status === "FECHAMENTO_SOLICITADO"
      );
    });

    setPedidosMesa(pedidosFiltrados);
    setPagamentosMesa([]);
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

  function formatarStatusPedido(status) {
    const statusMap = {
      NOVO_PEDIDO: "Novo pedido",
      PEDIDO_EM_PREPARO: "Pedido em preparo",
      PEDIDO_CONCLUIDO: "Pedido concluído",
      PEDIDO_CANCELADO: "Pedido cancelado",
      ENTREGUE: "Entregue",
    };

    return statusMap[status] || "Status desconhecido";
  }

  function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function pegarPrecoItem(item) {
    return Number(
      item.precoUnitario ??
      item.preco ??
      item.valorUnitario ??
      item.precoProduto ??
      item.valor ??
      0,
    );
  }

  const valorFinalComanda = useMemo(() => {
    return pedidosMesa.reduce((accPedidos, pedido) => {
      const totalPedido = (pedido.itens || []).reduce((accItens, item) => {
        const quantidade = Number(item.quantidade || 0);
        const preco = pegarPrecoItem(item);
        return accItens + quantidade * preco;
      }, 0);

      return accPedidos + totalPedido;
    }, 0);
  }, [pedidosMesa]);

  const pagamentoSelecionado = pagamentosMesa[0] || null;

  async function concluirPagamento() {
    const confirmarFechamento = window.confirm(
      "Tem certeza que deseja fechar a mesa?"
    );

    if (!confirmarFechamento) {
      return;
    }

    setConfirmandoPagamento(true);

    const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos")) || [];

    const pedidosAtualizados = pedidosSalvos.map(function (pedido) {
      if (
        pedido.mesa === mesa.numero &&
        pedido.status === "FECHAMENTO_SOLICITADO"
      ) {
        return {
          ...pedido,
          status: "FECHADO",
          fechadoEm: new Date().toISOString(),
        };
      }

      return pedido;
    });

    localStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados));

    alert("Mesa fechada com sucesso!");

    navigate("/home-funcionario/cashier/mesas");
  }

  if (!mesa) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] w-full box-border overflow-x-hidden flex flex-col justify-between p-4 gap-7 sm:p-8">
        <div>
          <header className="mb-8 flex flex-col items-center justify-center">
            <Logo />
            <p className="text-xl sm:text-2xl font-bold text-gray-700 text-center mt-2">
              Revisão da Mesa
            </p>
          </header>

          <main className="max-w-3xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
              <p className="text-gray-600 mb-4">
                Nenhuma mesa foi selecionada para revisão.
              </p>

              <button
                onClick={() => navigate("/home-funcionario/cashier/mesas")}
                className="bg-[#556B2F] text-white px-4 py-3 rounded-lg hover:bg-[#4a5b28] transition-colors"
              >
                Voltar para mesas
              </button>
            </div>
          </main>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] w-full box-border overflow-x-hidden flex flex-col justify-between p-4 gap-7 sm:p-8">
      <div>
        <header className="mb-8 flex flex-col items-center justify-center">
          <Logo />
          <p className="text-xl sm:text-2xl font-bold text-gray-700 text-center mt-2">
            Revisão da Mesa
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-[#556B2F] text-white text-base font-semibold px-5 py-2 rounded-lg hover:bg-[#4a5b28]"
          >
            Voltar
          </button>
        </header>

        <main className="max-w-4xl mx-auto space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">
              Mesa {mesa.numero}
            </h2>
            <p className="text-gray-600 mt-1">
              Status atual:{" "}
              <span className="font-semibold">
                {formatarStatusMesa(mesa.status)}
              </span>
            </p>
            <p className="text-gray-600">
              Capacidade:{" "}
              <span className="font-semibold">{mesa.capacidade}</span>
            </p>
          </div>

          {carregando ? (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <p className="text-gray-600">Carregando dados da revisão...</p>
            </div>
          ) : (
            <>
              {pedidosMesa.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <p className="text-gray-600">
                    Nenhum pedido encontrado para essa mesa.
                  </p>
                </div>
              ) : (
                pedidosMesa.map((pedido) => (
                  <div
                    key={pedido.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                  >
                    <div className="mb-3">
                      <div>
                        <p className="font-bold text-gray-800">
                          Pedido número: {pedido.id}
                        </p>
                        <p className="text-sm text-gray-600">
                          Status do pedido:{" "}
                          {formatarStatusPedido(pedido.statusPedido || pedido.status)}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-3 bg-[#f5f5f5]">
                      <p className="text-sm font-semibold text-gray-600 mb-3">
                        Itens do pedido
                      </p>

                      <div className="space-y-2">
                        {(pedido.itens || []).map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between gap-3 border-b border-gray-200 pb-2 last:border-b-0 last:pb-0"
                          >
                            <span className="text-gray-700 text-sm">
                              {item.nomeProduto || item.nome} x {item.quantidade}
                            </span>

                            <span className="text-sm font-medium text-gray-800">
                              {formatarMoeda(
                                Number(item.quantidade || 0) *
                                pegarPrecoItem(item),
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}

              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between text-base">
                  <span className="font-bold text-gray-800">
                    Valor final da comanda
                  </span>
                  <span className="font-bold text-gray-800">
                    {formatarMoeda(
                      pagamentoSelecionado?.valor ?? valorFinalComanda,
                    )}
                  </span>
                </div>

                <button
                  onClick={concluirPagamento}
                  disabled={confirmandoPagamento}
                  className="w-full mt-4 bg-[#556B2F] text-white px-4 py-3 rounded-lg hover:bg-[#4a5b28] font-semibold disabled:opacity-60"
                >
                  {confirmandoPagamento
                    ? "Confirmando pagamento..."
                    : "Fechar mesa"}
                </button>
              </div>
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default FinalizarMesa;
