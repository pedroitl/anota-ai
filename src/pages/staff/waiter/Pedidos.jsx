import Footer from "../../../components/Footer";
import Logo from "../../../components/UI/Logo";

function Pedidos() {
  const pedidos = [
    {
      id: 1,
      mesa: 5,
      itens: [
        {
          nome: "Pizza",
          quantidade: 1,
        },
        {
          nome: "Coca-cola",
          quantidade: 2,
        },
      ],
      status: "PEDIDO_EM_PREPARO",
    },
    {
      id: 2,
      mesa: 3,
      itens: [
        {
          nome: "Hambúrguer",
          quantidade: 1,
        },
        {
          nome: "Fritas",
          quantidade: 1,
        },
      ],
      status: "PEDIDO_CONCLUIDO",
    },
    {
      id: 3,
      mesa: 8,
      itens: [
        {
          nome: "Salada",
          quantidade: 1,
        },
        {
          nome: "Suco",
          quantidade: 1,
        },
      ],
      status: "NOVO_PEDIDO",
    },
    {
      id: 4,
      mesa: 2,
      itens: [
        {
          nome: "Lasanha",
          quantidade: 1,
        },
        {
          nome: "Vinho",
          quantidade: 1,
        },
        {
          nome: "Sobremesa",
          quantidade: 1,
        },
      ],
      status: "PEDIDO_CANCELADO",
    },
    {
      id: 5,
      mesa: 15,
      itens: [
        {
          nome: "Sushi",
          quantidade: 2,
        },
      ],
      status: "PEDIDO_CONCLUIDO",
    },
    {
      id: 6,
      mesa: 10,
      itens: [
        {
          nome: "Tacos",
          quantidade: 3,
        },
      ],
      status: "NOVO_PEDIDO",
    },
    {
      id: 7,
      mesa: 12,
      itens: [
        {
          nome: "Curry",
          quantidade: 1,
        },
      ],
      status: "PEDIDO_EM_PREPARO",
    },
  ];

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
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {pedidos.map((pedido) => {
          const statusInfo = getStatusInfo(pedido.status);

          return (
            <div
              key={pedido.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-2">Mesa {pedido.mesa}</h2>

              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.cor}`}
              >
                {statusInfo.texto}
              </span>

              <ul className="list-disc list-inside mt-3">
                {pedido.itens.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item.nome} x {item.quantidade}
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
