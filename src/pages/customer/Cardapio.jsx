import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { produtosMock } from "../../mocks/produtosMock";

function Cardapio() {

  const navigate = useNavigate();
  const [abrirDialog, setAbrirDialog] = useState(false);
  const [abrirMesaDialog, setAbrirMesaDialog] = useState(true);
  const [mesaSelecionada, setMesaSelecionada] = useState("");
  const [mesas, setMesas] = useState([]);
  const [comanda, setComanda] = useState(null);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await fetch("http://localhost:8080/produtos",{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }

        const data = await response.json();

        const produtosFormatados = data.map(produto => ({
          ...produto,
          quantidade: 0
        }));

        setProdutos(produtosFormatados);

      } catch (error) {
        console.warn("Backend indisponível. Usando produtos mockados.", error);
        setProdutos(produtosMock)
      }
    }
    carregarProdutos();
  }, []);

  useEffect(() => {
    async function carregarMesas() {
    try {
      const response = await fetch(
        "http://localhost:8080/mesas"
      );

      const data = await response.json();

      setMesas(data);
    } catch (error) {
      console.log(error);
    }
  }
  carregarMesas();
  }, []);

  async function confirmarMesa() {
    try {

      const verifica = await fetch(
        `http://localhost:8080/comandas/mesa/${mesaSelecionada}`
      );

      if (verifica.ok) {

        const comandaExistente = await verifica.json();

        const resposta = window.confirm(
          "Já existe uma comanda aberta para esta mesa. Você faz parte dela?"
        );

        if (resposta) {
          setComanda(comandaExistente);
          setAbrirMesaDialog(false);
        }

        return;
      }

      const response = await fetch(
        "http://localhost:8080/comandas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            numeroMesa: Number(mesaSelecionada)
          })
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao abrir comanda");
      }

      const novaComanda = await response.json();

      setComanda(novaComanda);
      setAbrirMesaDialog(false);

    } catch (error) {
      alert(error.message);
    }
  }

  function aumentar(id) {
    const novosProdutos = produtos.map(function (produto) {
      if (produto.id === id) {
        return {
          ...produto,
          quantidade: produto.quantidade + 1,
        };
      }

      return produto;
    });

    setProdutos(novosProdutos);
  }

  function diminuir(id) {
    const novosProdutos = produtos.map(function (produto) {
      if (produto.id === id && produto.quantidade > 0) {
        return {
          ...produto,
          quantidade: produto.quantidade - 1,
        };
      }

      return produto;
    });

    setProdutos(novosProdutos);
  }
  function validaPedido() {
    setAbrirDialog(true);
  }

  async function confirma(e) {
    e.preventDefault();

    if (produtosSelecionados.length === 0) {
      alert("Selecionar pelo menos um item para realizar o pedido!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const pedidoRequest = {
        comandaId: comanda.id,
        usuarioId: localStorage.getItem("usuario"),
        observacao: "",
        itens: produtosSelecionados.map(produto => ({
          idProduto: produto.id,
          quantidade: produto.quantidade
        }))
      };

      const response = await fetch(
        "http://localhost:8080/pedidos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(pedidoRequest)
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar pedido");
      }

      const pedidoCriado = await response.json();

      console.log(pedidoCriado);

      alert("Pedido enviado à cozinha!");

      navigate("/home-cliente/cardapio");

    } catch (error) {
      console.error(error);
      alert("Erro ao enviar pedido");
    }
  }
  

  function solicitarFechamentoMesa() {
    const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos")) || [];

    const pedidosDaMesa = pedidosSalvos.filter(function (pedido) {
      return pedido.mesa === 1;
    });

    const temPedidoEntregue = pedidosDaMesa.some(function (pedido) {
      return pedido.status === "ENTREGUE";
    });

    if (!temPedidoEntregue) {
      alert("Ainda não há pedidos entregues para solicitar o fechamento.");
      return;
    }

    const pedidosAtualizados = pedidosSalvos.map(function (pedido) {
      if (pedido.mesa === 1 && pedido.status === "ENTREGUE") {
        return {
          ...pedido,
          status: "FECHAMENTO_SOLICITADO",
          fechamentoSolicitadoEm: new Date().toISOString(),
        };
      }

      return pedido;
    });

    localStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados));

    alert("Fechamento solicitado! Aguarde o caixa conferir a comanda.");
  }

  const produtosSelecionados = produtos.filter(function (produto) {
    return produto.quantidade > 0;
  });

  const totalPedido = produtos.reduce(function (total, produto) {
    return total + produto.preco * produto.quantidade;
  }, 0);

  if (abrirMesaDialog) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl w-96">
          <h2 className="text-2xl font-bold mb-4">
            Selecione sua mesa
          </h2>

          <select
            className="w-full border p-2 rounded"
            value={mesaSelecionada}
            onChange={(e) =>
              setMesaSelecionada(e.target.value)
            }
          >
            <option value="">
              Escolha uma mesa
            </option>

            {mesas.map((mesa) => (
              <option
                key={mesa.id}
                value={mesa.numeroMesa}
              >
                Mesa {mesa.numeroMesa}
              </option>
            ))}
          </select>

          <button
            className="w-full mt-4 bg-green-800 text-white p-2 rounded"
            onClick={confirmarMesa}
          >
            Confirmar
          </button>
        </div>
      </div>
    );
  }
  return (
    
    <div className="">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Cardápio
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {produtos.map(function (produto) {
          return (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden"
              key={produto.id}>
              <img
                src={produto.imagemURL}
                alt={produto.nome}
                className="w-full h-56 object-cover"
              />

              <div className="p-5" >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {produto.nome}
                </h2>

                <p className="text-gray-600 text-sm mb-5">
                  {produto.descricao}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-500">
                    R${produto.preco.toFixed(2)}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      className="w-8 h-8 rounded-full bg-red-900 text-white text-xl hover:bg-red-600 flex items-center justify-center leading-none"
                      onClick={() => diminuir(produto.id)}
                    >
                      -
                    </button>

                    <span className="text-lg font-bold min-w-20px text-center">
                      {produto.quantidade}
                    </span>

                    <button
                      className="w-8 pb-2 h-8 rounded-full bg-green-900 text-white text-xl hover:bg-green-600 flex items-center justify-center leading-none"
                      onClick={() => aumentar(produto.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-4 mt-10">
        <button
          type="button"
          className="bg-[#556B2F] text-white px-6 py-3 rounded-xl hover:bg-green-700"
          onClick={validaPedido}
        >
          Realizar Pedido
        </button>

        <button
          type="button"
          onClick={solicitarFechamentoMesa}
          className="bg-red-800 text-white px-6 py-3 rounded-xl hover:bg-red-900 font-semibold"
        >
          Solicitar fechamento da mesa
        </button>
      </div>
      {abrirDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-500px">
            <h1 className="text-2xl font-bold mb-4">Resumo do Pedido</h1>
            {produtosSelecionados.map(function (produto) {
              return (
                <div key={produto.id} className="border-b py-3">
                  <h2 className="font-bold">{produto.nome}</h2>

                  <p>Quantidade: {produto.quantidade}</p>

                  <p>
                    Total Item: R${" "}
                    {(produto.preco * produto.quantidade).toFixed(2)}
                  </p>
                </div>
              );
            })}
            <h2 className="text-xl font-bold mt-5">
              Total Pedido: R$ {totalPedido.toFixed(2)}
            </h2>

            <form onSubmit={confirma} className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setAbrirDialog(false)}
                className="bg-red-700 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="bg-green-900 text-white px-4 py-2 rounded"
              >
                Confirmar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cardapio;
