import Logo from "../../../components/UI/Logo";
import { useEffect, useState } from "react";



function PedidosCozinha() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos")) || [];

        const pedidosDaCozinha = pedidosSalvos.filter(function (pedido) {
            return (
                pedido.status === "NOVO_PEDIDO" ||
                pedido.status === "PEDIDO_EM_PREPARO" ||
                pedido.status === "PEDIDO_CONCLUIDO"
            )
        })

        setPedidos(pedidosDaCozinha);
    }, []);

    function atualizarStatusPedido(id, novoStatus) {
        const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos")) || [];

        const pedidosAtualizados = pedidosSalvos.map(function (pedido) {
            if (pedido.id === id) {
                return {
                    ...pedido,
                    status: novoStatus,
                };
            }
            return pedido;
        })

        localStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados));

        const pedidosDaCozinha = pedidosAtualizados.filter(function (pedido) {
            return (
                pedido.status === "NOVO_PEDIDO" ||
                pedido.status === "PEDIDO_EM_PREPARO" ||
                pedido.status === "PEDIDO_CONCLUIDO"
            );
        });

        setPedidos(pedidosDaCozinha);
    }

    return (
        <div className="min-h-screen bg-[#f5f5f5] p-6">
            <Logo />
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Pedidos da Cozinha
            </h1>

            {pedidos.length === 0 ? (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-600">Nenhum pedido novo no momento!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pedidos.map(function (pedido) {
                        return (
                            <div key={pedido.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        Mesa {pedido.mesa}
                                    </h2>
                                    <span className={`rounded-full px-3 py-1 text-sm font-bold ${pedido.status === "NOVO_PEDIDO" ? "bg-[#C8A44D] text-white" : pedido.status === "PEDIDO_EM_PREPARO" ? "bg-[#B85C38] text-white" : pedido.status === "PEDIDO_CONCLUIDO" ? "bg-[#556B2F] text-white" : pedido.status === "FECHAMENTO_SOLICITADO" ? "bg-[#4E5047] text-white" : "bg-gray-100 text-gray-700"}`}>
                                        {pedido.status}
                                    </span>
                                </div>
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

                                                <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                                            </div>
                                        )
                                    })

                                    }
                                </div>
                                <div className="mt-4 flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>R$ {pedido.total.toFixed(2)}</span>
                                </div>
                                <div className="mt-5 flex justify-end border-t border-gray-200 pt-4">
                                    {pedido.status === "NOVO_PEDIDO" && (
                                        <button
                                            type="button"
                                            onClick={() => atualizarStatusPedido(pedido.id, "PEDIDO_EM_PREPARO")}
                                            className="inline-flex items-center justify-center rounded-lg bg-[#556B2F] px-4 py-2 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#4a5b28]"
                                        >
                                            Aceitar Pedido
                                        </button>
                                    )}

                                    {pedido.status === "PEDIDO_EM_PREPARO" && (
                                        <button
                                            type="button"
                                            onClick={() => atualizarStatusPedido(pedido.id, "PEDIDO_CONCLUIDO")}
                                            className="inline-flex items-center justify-center rounded-lg bg-[#556B2F] px-4 py-2 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#4a5b28]"
                                        >
                                            Marcar como Pronto
                                        </button>
                                    )}


                                    {pedido.status === "PEDIDO_CONCLUIDO" && (
                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center rounded-lg bg-[#556B2F] px-4 py-2 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#4a5b28]"
                                        >
                                            Pedido Pronto
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    })

                    }
                </div>
            )
            }

        </div>
    )
}

export default PedidosCozinha;