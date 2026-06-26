import { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Logo from "../../../components/UI/Logo";
import { Link } from "react-router-dom";

function Pedidos() {
  const [pedidos,setPedidos] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("")


  useEffect( () => {
    listarPedidos();
  }, []);

  async function listarPedidos() {
    try {
      const response = await fetch("http://localhost:8080/pedidos")

      if(!response.ok){
        throw new Error("erro ao buscar pedido!");
      }

      const data = await response.json();
      setPedidos(data);

    } catch(error){
      console.error(error)
    }
  }

  async function confirmarEntrega(idPedido) {
    try{
      const response = await fetch(`http://localhost:8080/pedidos/${idPedido}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          statusPedido: "ENTREGUE"  
        })
      });

      if(!response.ok){
        throw new Error("erro ao atualizar!")
      }

      await listarPedidos();

    } catch(error){
      console.log(error)
    }
  }

  const pedidoFiltrados = pedidos.filter((pedido) => {
    if(!filtroStatus) return true;
    return pedido.statusPedido === filtroStatus;
  });

  function getStatusInfo(status) {
    switch (status) {
      case "NOVO_PEDIDO":
        return {
          texto: "Novo Pedido",
          cor: "bg-blue-100 text-blue-500",
        };
      case "PEDIDO_EM_PREPARO":
        return {
          texto: "Pedido em Preparo",
          cor: "bg-yellow-100 text-yellow-500",
        };
      case "PEDIDO_CONCLUIDO":
        return {
          texto: "Pedido Concluído",
          cor: "bg-green-100 text-green-500",
        };
      case "PEDIDO_CANCELADO":
        return {
          texto: "Pedido Cancelado",
          cor: "bg-red-100 text-red-500",
        };
      default:
        return {
          texto: "Status Desconhecido",
          cor: "bg-gray-100 text-gray-500",
        };
    }
  }

  return (
    <div className="min-h-screen w-full p-4 sm:p-8">
      <header className="mb-8 flex flex-col items-center justify-center">
        <Logo />
        <h1 className="text-center text-lg md:text-2xl font-bold">Pedidos</h1>

        <Link to="/home-funcionario/waiter/mesas"  className="bg-gray-800 text-white px-4 py-2 rounded">
        Ir para mesas
        </Link>

        <Link to="/home-funcionario/waiter/notificacoes"  className="bg-gray-800 text-white px-4 py-2 rounded">
        Ir para notificaçoes
        </Link>
      </header>

    <div className="max-w-7xl mx-auto mb-6">
      <label className="block mb-2 font-semibold">Filtrar por status</label>
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
        <option value="">Todos</option>
        <option value="NOVO_PEDIDO">Novo Pedido</option>
        <option value="PEDIDO_EM_PREPARO">Pedido em Preparo</option>
        <option value="PEDIDO_CONCLUIDO">Pedido Concluído</option>
        <option value="PEDIDO_CANCELADO">Pedido Cancelado</option>
        <option value="ENTREGUE">Entregue</option>
      </select>
    </div>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {pedidoFiltrados.map((pedido) => {
          const statusInfo = getStatusInfo(pedido.statusPedido);

          return (
            <div
              key={pedido.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-2">Mesa {pedido.numeroMesa}</h2>

              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.cor}`}
              >
                {statusInfo.texto}
              </span>

              <ul className="list-disc list-inside mt-3">
                {pedido.itens.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item.nomeProduto} x {item.quantidade}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </main>
      <Footer />
    </div>
  );
}

export default Pedidos;
