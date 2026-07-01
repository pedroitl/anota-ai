import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../components/UI/Logo";
import Footer from "../../../components/Footer";

function FinalizarMesa() {
  const location = useLocation();
  const navigate = useNavigate();

  const mesa = location.state?.mesa;
  const comandaId = location.state?.comandaId;

  const [pedidosMesa, setPedidosMesa] = useState([]);
  const [pagamentosMesa, setPagamentosMesa] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [confirmandoPagamento, setConfirmandoPagamento] = useState(false);

  useEffect(() => {
    if (!mesa || !comandaId) {
      setCarregando(false);
      return;
    }

    buscarDadosMesa();
  }, [mesa, comandaId]);

  function normalizarComandaId(obj) {
    return obj?.comanda_id ?? obj?.comandaId ?? obj?.comanda?.id ?? null;
  }

  function normalizarFormaPagamento(pagamento) {
    return (
      pagamento?.formaPagamento ??
      pagamento?.metodoPagamento ??
      pagamento?.tipoPagamento ??
      null
    );
  }

  function normalizarDataPagamento(pagamento) {
    return (
      pagamento?.dataHora ??
      pagamento?.dataPagamento ??
      pagamento?.data ??
      null
    );
  }

  function normalizarStatusPagamento(pagamento) {
    return pagamento?.statusPagamento ?? pagamento?.status ?? null;
  }

  async function buscarDadosMesa() {
    try {
      setCarregando(true);

      const [responsePedidos, responsePagamentos] = await Promise.all([
        fetch("http://localhost:8080/pedidos"),
        fetch("http://localhost:8080/pagamentos"),
      ]);

      if (!responsePedidos.ok) {
        throw new Error("Erro ao buscar pedidos.");
      }

      if (!responsePagamentos.ok) {
        throw new Error("Erro ao buscar pagamentos.");
      }

      const pedidos = await responsePedidos.json();
      const pagamentos = await responsePagamentos.json();

      const numeroMesa =
        mesa.numero ?? mesa.numeroMesa ?? mesa.numero_mesa ?? null;

      const pedidosFiltrados = pedidos.filter(
        (pedido) => pedido.numeroMesa === numeroMesa,
      );

      const pagamentosFiltrados = pagamentos.filter(
        (pagamento) => normalizarComandaId(pagamento) === comandaId,
      );

      console.log("Mesa recebida:", mesa);
      console.log("ComandaId recebida:", comandaId);
      console.log("Pedidos filtrados:", pedidosFiltrados);
      console.log("Pagamentos filtrados:", pagamentosFiltrados);

      setPedidosMesa(pedidosFiltrados);
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
    const statusNormalizado = status ?? mesa?.statusMesa ?? mesa?.status;

    const statusMap = {
      LIVRE: "Livre",
      OCUPADA: "Ocupada",
      AGUARDANDO_PEDIDO: "Aguardando pedido",
      NOVO_PEDIDO: "Novo pedido",
      FECHAMENTO_SOLICITADO: "Fechamento solicitado",
    };

    return statusMap[statusNormalizado] || "Status desconhecido";
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

  function formatarStatusPagamento(status) {
    const statusMap = {
      PENDENTE: "Pendente",
      CONFIRMADO: "Confirmado",
      CANCELADO: "Cancelado",
    };

    return statusMap[status] || "Status desconhecido";
  }

  function formatarMetodoPagamento(metodo) {
    const metodoMap = {
      CARTAO: "Cartão",
      PIX: "Pix",
      DINHEIRO: "Dinheiro",
    };

    return metodoMap[metodo] || metodo || "Não encontrado";
  }

  function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatarData(data) {
    if (!data) return "-";
    return new Date(data).toLocaleString("pt-BR");
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

  const pagamentoSelecionado = useMemo(() => {
    if (!pagamentosMesa.length) return null;

    return (
      pagamentosMesa.find(
        (pagamento) => normalizarStatusPagamento(pagamento) === "PEDENTE",
      ) || pagamentosMesa[0]
    );
  }, [pagamentosMesa]);

  async function concluirPagamento() {
    if (!pagamentoSelecionado?.id) {
      alert("Nenhum pagamento válido foi encontrado para esta mesa.");
      return;
    }

    const confirmar = window.confirm(
      "Tem certeza que deseja concluir o pagamento desta mesa?",
    );

    if (!confirmar) {
      return;
    }

    try {
      setConfirmandoPagamento(true);

      const response = await fetch(
        `http://localhost:8080/pagamentos/${pagamentoSelecionado.id}/concluir`,
        {
          method: "PATCH",
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao concluir pagamento.");
      }

      alert("Pagamento concluído com sucesso!");
      navigate("/home-funcionario/cashier/mesas");
    } catch (error) {
      console.error("Erro ao concluir pagamento:", error);
      alert("Não foi possível concluir o pagamento.");
    } finally {
      setConfirmandoPagamento(false);
    }

  }

  if (!mesa || !comandaId) {
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
                Dados insuficientes para revisar a mesa.
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

  const numeroMesaExibicao = mesa.numero ?? mesa.numeroMesa ?? mesa.numero_mesa;
  const capacidadeExibicao = mesa.capacidade;
  const statusMesaExibicao = mesa.status ?? mesa.statusMesa;

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
              Mesa {numeroMesaExibicao}
            </h2>
            <p className="text-gray-600 mt-1">
              Status atual:{" "}
              <span className="font-semibold">
                {formatarStatusMesa(statusMesaExibicao)}
              </span>
            </p>
            <p className="text-gray-600">
              Capacidade:{" "}
              <span className="font-semibold">{capacidadeExibicao}</span>
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

                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-2">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Método:</span>{" "}
                    {formatarMetodoPagamento(
                      normalizarFormaPagamento(pagamentoSelecionado),
                    )}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Data:</span>{" "}
                    {formatarData(
                      normalizarDataPagamento(pagamentoSelecionado),
                    )}
                  </p>
                </div>

                <button
                  onClick={concluirPagamento}
                  disabled={
                    confirmandoPagamento ||
                    !pagamentoSelecionado?.id ||
                    normalizarStatusPagamento(pagamentoSelecionado) ===
                      "CONFIRMADO"
                  }
                  className="w-full mt-5 bg-[#556B2F] text-white px-4 py-3 rounded-lg hover:bg-[#4a5b28] transition-colors font-semibold disabled:opacity-60 disabled:cursor-not-allowed"

                >
                  {confirmandoPagamento
                    ? "Confirmando pagamento..."
                    : normalizarStatusPagamento(pagamentoSelecionado) ===
                        "CONFIRMADO"
                      ? "Pagamento já confirmado"
                      : "Concluir pagamento"}
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