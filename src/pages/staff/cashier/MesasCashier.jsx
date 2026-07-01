import { useEffect, useMemo, useState } from "react";
import Logo from "../../../components/UI/Logo";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";

function agruparMesasPorSecao(listaMesas) {
  const mapaSecoes = {};

  listaMesas.forEach((mesa) => {
    const nomeSecao = mesa.secao || "Sem seção";

    if (!mapaSecoes[nomeSecao]) {
      mapaSecoes[nomeSecao] = {
        nome: nomeSecao,
        mesas: [],
      };
    }

    mapaSecoes[nomeSecao].mesas.push({
      id: mesa.id,
      numero: mesa.numeroMesa,
      status: mesa.statusMesa,
      capacidade: mesa.capacidade,
    });
  });

  return Object.values(mapaSecoes);
}

function MesasCashier() {
  const [secoes, setSecoes] = useState([]);
  const [comandas, setComandas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [mesaSelecionada, setMesaSelecionada] = useState(null);
  const [carregando, setCarregando] = useState(true);


  const navigate = useNavigate();


  const secoesFiltradas = useMemo(() => {
    return secoes
      .map((secao) => ({
        ...secao,
        mesas: secao.mesas.filter(
          (mesa) => mesa.status === "FECHAMENTO_SOLICITADO",
        ),
      }))
      .filter((secao) => secao.mesas.length > 0);
  }, [secoes]);


  const mesas = useMemo(
    () => secoesFiltradas.flatMap((secao) => secao.mesas),
    [secoesFiltradas],
  );

  useEffect(() => {
    async function listarDados() {
      try {
        setCarregando(true);

        const [responseMesas, responseComandas] = await Promise.all([
          fetch("http://localhost:8080/mesas"),
          fetch("http://localhost:8080/comandas"),
        ]);

        if (!responseMesas.ok) {
          throw new Error(`Erro ao buscar mesas: ${responseMesas.status}`);
        }

        if (!responseComandas.ok) {
          throw new Error(`Erro ao buscar comandas: ${responseComandas.status}`);
        }

        const dataMesas = await responseMesas.json();
        const dataComandas = await responseComandas.json();

        const secoesAgrupadas = agruparMesasPorSecao(dataMesas);

        setSecoes(secoesAgrupadas);
        setComandas(dataComandas);
      } catch (error) {
        console.error("Erro ao listar dados do caixa:", error);
        alert("Não foi possível carregar as mesas do caixa.");
      } finally {
        setCarregando(false);
      }
    }

    listarDados();
  }, []);

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


  function abrirModal(numeroMesa) {
    setMesaSelecionada(numeroMesa);
    setModalAberto(true);
  }


  function fecharModal() {
    setModalAberto(false);
    setMesaSelecionada(null);
  }


  const mesaAtual = mesas.find((mesa) => mesa.numero === mesaSelecionada);


  const secaoAtual =
    secoesFiltradas.find((secao) =>
      secao.mesas.some((mesa) => mesa.numero === mesaSelecionada),
    )?.nome || "Sem seção";


  function encontrarComandaAbertaDaMesa(mesa) {
  if (!mesa) return null;


  return (
    comandas.find((comanda) => {
      const statusDaComanda = String(
        comanda.status ?? comanda.statusComanda ?? "",
      ).toUpperCase();


      const mesaDaComanda =
        comanda.mesaId ??
        comanda.mesa_id ??
        comanda.mesa?.id ??
        comanda.numeroMesa ??
        comanda.mesa?.numero ??
        comanda.mesaNumero;


      return (
        statusDaComanda === "ABERTA" &&
        (
          Number(mesaDaComanda) === Number(mesa.id) ||
          Number(mesaDaComanda) === Number(mesa.numero)
        )
      );
    }) || null
  );
}


  function irParaCobranca() {
    if (!mesaAtual) {
      alert("Nenhuma mesa selecionada.");
      return;
    }


    const comandaAberta = encontrarComandaAbertaDaMesa(mesaAtual);


    if (!comandaAberta) {
      alert("Nenhuma comanda aberta foi encontrada para esta mesa.");
      return;
    }


    navigate("/home-funcionario/cashier/finalizar", {
      state: {
        mesa: mesaAtual,
        comandaId: comandaAberta.id,
      },
    });
  }


  return (
    <div className="min-h-screen bg-[#f5f5f5] w-full box-border overflow-x-hidden flex flex-col justify-between p-4 gap-7 sm:p-8">
      <header className="mb-8 flex flex-col items-center justify-center gap-3">
        <Logo />
        <p className="text-xl sm:text-2xl font-bold text-gray-700 text-center mt-2">
          Mesas para fechamento
        </p>
      </header>


      <main className="flex-1">
        {carregando ? (
          <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
            <p className="text-gray-600">Carregando mesas...</p>
          </div>
        ) : secoesFiltradas.length === 0 ? (
          <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
            <p className="text-gray-600">
              Nenhuma mesa com fechamento solicitado no momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 p-6 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
            {secoesFiltradas.map((secao) => (
              <div
                key={secao.nome}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5"
              >
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  {secao.nome}
                </h2>


                <div className="space-y-3">
                  {secao.mesas.map((mesa) => (
                    <button
                      key={mesa.id}
                      type="button"
                      onClick={() => abrirModal(mesa.numero)}
                      className="w-full text-left border border-gray-200 rounded-xl p-4 bg-[#fafafa] hover:bg-[#f0f0f0] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-gray-800">
                          Mesa {mesa.numero}
                        </span>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                          {formatarStatusMesa(mesa.status)}
                        </span>
                      </div>


                      <p className="text-sm text-gray-600">
                        Capacidade: {mesa.capacidade} pessoas
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>


      {modalAberto && mesaAtual && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={fecharModal}
          />


          <div className="absolute right-0 top-0 h-full w-full sm:w-95 bg-white shadow-2xl p-6">
            <button
              type="button"
              onClick={fecharModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>


            <h2 className="text-2xl font-bold mb-2">Mesa {mesaAtual.numero}</h2>


            <p className="text-gray-600 mb-4">
              Esta mesa está pronta para seguir ao caixa.
            </p>


            <div className="space-y-3">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm text-gray-500">Status atual</p>
                <p className="font-semibold text-gray-800">
                  {formatarStatusMesa(mesaAtual.status)}
                </p>
              </div>


              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm text-gray-500">Capacidade</p>
                <p className="font-semibold text-gray-800">
                  {mesaAtual.capacidade || "-"} pessoas
                </p>
              </div>


              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm text-gray-500">Seção</p>
                <p className="font-semibold text-gray-800">{secaoAtual}</p>
              </div>
            </div>


            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={irParaCobranca}
                className="w-full bg-[#556B2F] text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Ir para cobrança
              </button>


              <button
                type="button"
                onClick={fecharModal}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}


      <Footer />
    </div>
  );
}


export default MesasCashier;
