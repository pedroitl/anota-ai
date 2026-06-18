import { useState} from "react";
import Logo from "../../../components/UI/Logo";
import SecaoCard from "../../../components/SecaoCard";
import Footer from "../../../components/Footer";

function Mesas(){   
    const [secoes, setSecoes] = useState([
        {nome: 'Lounge', mesas: [{numero: 1, status: 'Livre'}, {numero: 2, status: 'Ocupada'}, {numero: 7, status: 'Livre'}, {numero: 8, status: 'Ocupada'}]},
        {nome: 'Area VIP', mesas: [{numero: 3, status: 'Aguardando Pedido'}, {numero: 4, status: 'Novo Pedido'}, {numero: 9, status: 'Livre'}, {numero: 10, status: 'Ocupada'}]},
        {nome: 'Interna', mesas: [{numero: 5, status: 'Fechamento Solicitado'}, {numero: 6, status: 'Livre'}, {numero: 11, status: 'Ocupada'}, {numero: 12, status: 'Livre'}]}
    ]);

    const [modalAberto,setModalAberto] = useState(false);
    const [mesaSelecionada, setMesaSelecionada] = useState(null);
    const mesas = secoes.reduce((acc, secao) => [...acc, ...secao.mesas], []);

    function abrirModal(numeroMesa){
        setMesaSelecionada(numeroMesa);
        setModalAberto(true);
        console.log(numeroMesa);
    }

    function fecharModal(){
        setModalAberto(false);
        setMesaSelecionada(null);
        
    }

    function mudarStatus(numeroMesa, novoStatus){
        setSecoes(secoes.map(secao => ({
            ...secao,
            mesas: secao.mesas.map(mesa => {
                if (mesa.numero === numeroMesa) {
                    return { ...mesa, status: novoStatus };
                }
                return mesa;
            })
        })));
        fecharModal();
    }

    

    return(
        <div className="min-h-screen bg-[#f5f5f5] w-full box-border overflow-x-hidden flex flex-col justify-between p-4 gap-7 sm:p-8">
            <header className="mb-8 flex flex-col items-center justify-center">
                    <Logo />
                    <p className="text-xl sm:text-2xl font-bold text-gray-700 text-center mt-2 ">
                        Gerenciamento de Mesas</p>
            </header>
                       
            <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full">
                {secoes.map((secao) => (
                    <SecaoCard
                        key={secao.nome}
                        nome={secao.nome}
                        mesas={secao.mesas}
                        onMesaClick={abrirModal}
                    />
                ))}
            </main>

            {modalAberto && (
                        <div className="fixed inset-0 z-50">

                            <div 
                                className="absolute inset-0 bg-black/40"
                                onClick={fecharModal}
                            />

                            <div className="absolute right-0 top-0 h-full w-full sm:w-95 bg-white shadow-2xl p-6 transition-transform transform translate-x-0 ">

                                <button 
                                    onClick={fecharModal}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                                >
                                    ×
                                </button>

                                <h2 className="text-2xl font-bold mb-2">Mesa {mesaSelecionada}</h2>

                                <p className="text-gray-600 mb-6">
                                    Status atual: <span className="font-semibold capitalize">
                                        {mesas.find(mesa => mesa.numero === mesaSelecionada)?.status}
                                    </span>
                                </p>

                                <div className="flex flex-col gap-3 mb-6">
                                    <button 
                                        className="bg-[#556B2F] text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
                                        onClick={() => mudarStatus(mesaSelecionada, 'Livre')}
                                    >
                                        Marcar como Livre
                                    </button>
                                    
                                    <button 
                                        className="bg-[#7A1F2B] text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
                                        onClick={() => mudarStatus(mesaSelecionada, 'Ocupada')}
                                    >
                                        Marcar como Ocupada
                                    </button>
                                    
                                    <button 
                                        className="bg-[#B85C38] text-white px-4 py-3 rounded-lg hover:bg-orange-500 transition-colors font-medium"
                                        onClick={() => mudarStatus(mesaSelecionada, 'Aguardando Pedido')}
                                    >
                                        Aguardando Pedido
                                    </button>
                                    
                                    <button 
                                        className="bg-[#C8A44D] text-white px-4 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
                                        onClick={() => mudarStatus(mesaSelecionada, 'Novo Pedido')}
                                    >
                                        Novo Pedido
                                    </button>
                                    
                                    <button 
                                        className="bg-[#4E5047] text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                                        onClick={() => mudarStatus(mesaSelecionada, 'Fechamento Solicitado')}
                                    >
                                        Fechamento Solicitado
                                    </button>
                                </div>

                            </div>    
                        </div>
            )}


            <Footer />
        </div>
    )
}

export default Mesas;