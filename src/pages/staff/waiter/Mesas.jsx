import { useState} from "react";
import MesaCard from '../../../components/MesaCard';
import Logo from "../../../components/UI/Logo";

function Mesas(){
    
    const [mesas,setMesas] = useState([
        {numero: 1 , status : 'Livre'},
        {numero: 2 , status : 'Ocupada'},
        {numero: 3 , status : 'Aguardando Pedido'},
        {numero: 4 , status : 'Novo Pedido'},
        {numero: 5 , status : 'Fechamento Solicitado'}
    ]);

    const [modalAberto,setModalAberto] = useState(false);
    const [mesaSelecionada, setMesaSelecionada] = useState(null);

    function abrirModal(numeroMesa){
        setMesaSelecionada(numeroMesa);
        setModalAberto(true);
    }

    function fecharModal(){
        setModalAberto(false);
        setMesaSelecionada(null);
    }

    function mudarStatus(numeroMesa, novoStatus){
        setMesas(mesas.map(mesa =>
            mesa.numero === numeroMesa
            ? {...mesa, status: novoStatus}
            : mesa
        ));
        fecharModal();
    }

    function Operador () {
        return 'Pedro';
        }

    return(
        <div className="min-h-screen bg-[#f5f5f5] w-full box-border overflow-x-hidden flex flex-col justify-between p-4 sm:p-8">
            <header className="mb-8 flex flex-col items-center justify-center">
                    <Logo />
                    <p className="text-xl sm:text-2xl font-bold text-gray-700 text-center mt-2 ">
                        Gerenciamento de Mesas</p>
            </header>
                       
            <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full">
                {mesas.map((mesa) => (
                    <MesaCard
                        key={mesa.numero}
                        numero={mesa.numero}
                        status={mesa.status}
                        onClick={() => abrirModal(mesa.numero)}
                    />
                ))}
            </main>
            
        
            {modalAberto && (
                <div className="w-full max-w-sm bg-white rounded-lg p-6 border-2 border-gray-200 shadow-xl md:sticky md:top-8 h-fit mt-6 md:mt-0">
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
                            className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
                            onClick={() => mudarStatus(mesaSelecionada, 'Livre')}
                        >
                            Marcar como Livre
                        </button>
                        
                        <button 
                            className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
                            onClick={() => mudarStatus(mesaSelecionada, 'Ocupada')}
                        >
                            Marcar como Ocupada
                        </button>
                        
                        <button 
                            className="bg-orange-400 text-white px-4 py-3 rounded-lg hover:bg-orange-500 transition-colors font-medium"
                            onClick={() => mudarStatus(mesaSelecionada, 'Aguardando Pedido')}
                        >
                            Aguardando Pedido
                        </button>
                        
                        <button 
                            className="bg-yellow-300 text-white px-4 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
                            onClick={() => mudarStatus(mesaSelecionada, 'Novo Pedido')}
                        >
                            Novo Pedido
                        </button>
                        
                        <button 
                            className="bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                            onClick={() => mudarStatus(mesaSelecionada, 'Fechamento Solicitado')}
                        >
                            Fechamento Solicitado
                        </button>
                    </div>

                    <div className="flex gap-3">
                        <button 
                            onClick={fecharModal}
                            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}

            <footer className="w-full max-w-5xl mx-auto border-t border-gray-200 mt-12 pt-4 flex flex-col items-centersm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
                <p>Atualizado em tempo real | Operador: <span className="font-semibold">{Operador()}</span></p>
            </footer>
        </div>
    )
}

export default Mesas;