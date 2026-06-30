import Logo from "../../../components/UI/Logo";
import { useEffect, useState } from "react";



function PedidosCozinha() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos")) || [];

        const pedidosDaCozinha = pedidosSalvos.filter(function (pedido) {
            return (
                pedido.status === "NOVO" ||
                pedido.status === "EM_PREPARO" ||
                pedido.status === "PRONTO"
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
                pedido.status === "NOVO" ||
                pedido.status === "EM_PREPARO" ||
                pedido.status === "PRONTO"
            );
        });

        setPedidos(pedidosDaCozinha);
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Logo />
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Pedidos da Cozinha
            </h1>

            {pedidos.length === 0 ? (
                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-600">Nenhum pedido novo no momento!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pedidos.map(function (pedido) {
                        return (
                            <div key={pedido.id} className="bg-white rounded-xl shadow p-5">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        Mesa {pedido.mesa}
                                    </h2>
                                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
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
                                <div className="mt-5 flex justify-end">
                                    {pedido.status === "NOVO" && (
                                        <button
                                            type="button"
                                            onClick={() => atualizarStatusPedido(pedido.id, "EM_PREPARO")}
                                            className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-800"
                                        >
                                            Aceitar Pedido
                                        </button>
                                    )}

                                    {pedido.status === "EM_PREPARO" && (
                                        <button
                                            type="button"
                                            onClick={() => atualizarStatusPedido(pedido.id, "PRONTO")}
                                            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-emerald-700"
                                        >
                                            Marcar como Pronto
                                        </button>
                                    )}


                                    {pedido.status === "PRONTO" && (
                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-green-700"
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