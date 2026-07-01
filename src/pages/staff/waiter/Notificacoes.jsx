import { useEffect, useState } from "react";
import Logo from "../../../components/UI/Logo";

function Notificacoes() {
  const [pedidosProntos, setPedidosProntos] = useState([]);

  useEffect(() => {
    carregarPedidosProntos();
  }, []);

  function carregarPedidosProntos() {
    const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos")) || [];

    const pedidosFiltrados = pedidosSalvos.filter(function (pedido) {
      return pedido.status === "PEDIDO_CONCLUIDO";
    });

    setPedidosProntos(pedidosFiltrados);
  }

  function confirmarEntrega(id) {
    const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos")) || [];

    const pedidosAtualizados = pedidosSalvos.map(function (pedido) {
      if (pedido.id === id) {
        return {
          ...pedido,
          status: "ENTREGUE",
          entregueEm: new Date().toISOString(),
        };
      }

      return pedido;
    });

    localStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados));

    const pedidosAindaProntos = pedidosAtualizados.filter(function (pedido) {
      return pedido.status === "PEDIDO_CONCLUIDO";
    });

    setPedidosProntos(pedidosAindaProntos);
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6">
      <Logo />

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Notificações do Garçom
      </h1>

      {pedidosProntos.length === 0 ? (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-gray-600">
            Nenhum pedido pronto para entrega no momento.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pedidosProntos.map(function (pedido) {
            return (
              <div key={pedido.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    Mesa {pedido.mesa}
                  </h2>

                  <span className="bg-[#556B2F] text-white px-3 py-1 rounded-full text-sm font-bold">
                    PEDIDO_CONCLUIDO
                  </span>
                </div>

                <p className="text-gray-700 font-semibold mb-3">
                  Pedido pronto para ser levado à mesa.
                </p>

                <div className="space-y-3">
                  {pedido.itens.map(function (item) {
                    return (
                      <div
                        key={item.id}
                        className="flex justify-between border-b pb-2"
                      >
                        <span>
                          {item.quantidade}x {item.nome}
                        </span>

                        <span>
                          R$ {(item.preco * item.quantidade).toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>R$ {pedido.total.toFixed(2)}</span>
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => confirmarEntrega(pedido.id)}
                    className="bg-[#556B2F] text-white px-4 py-2 rounded-lg hover:bg-[#4a5b28] font-semibold"
                  >
                    Confirmar entrega na mesa
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

export default Notificacoes;