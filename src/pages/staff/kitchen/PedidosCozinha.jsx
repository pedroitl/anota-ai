import Logo from "../../../components/UI/Logo";
import { useEffect, useState } from "react";

function PedidosCozinha() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos")) || [];

        const pedidosNovos = pedidosSalvos.filter(function (pedido) {
            return pedido.status === "NOVO";
        })

        setPedidos(pedidosNovos);
    }, []);

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
                                        Novo
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