import { useState} from "react";
import MesaCard from '../../../components/MesaCard';
import Logo from "../../../components/UI/Logo";

function Mesas(){
    
    const [mesas,setMesas] = useState([
        {numero: 1 , status : 'livre'},
        {numero: 2 , status : 'ocupada'},
        {numero: 3 , status : 'aguardando_pedido'},
        {numero: 4 , status : 'novo_pedido'},
        {numero: 5 , status : 'fechamento_solicitado'}
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

    return(
        <div className="min-h-screen bg-gray-100 p-8 flex gap-8 justify-center">
            <div className="max-w-5xl">
                <div className="mb-8 flex justify-center">
                    <Logo />
                </div>
        
                <div className="grid grid-cols-3 gap-6">
                    {mesas.map((mesa) => (
                        <MesaCard
                            key={mesa.numero}
                            numero={mesa.numero}
                            status={mesa.status}
                            onClick={() => abrirModal(mesa.numero)}
                        />
                    ))}
                </div>
            </div>
        
            {modalAberto && (
                <div className="w-96 bg-white rounded-lg p-6 border-2 border-gray-200 shadow-xl sticky top-8 h-fit">
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
                            onClick={() => mudarStatus(mesaSelecionada, 'livre')}
                        >
                            Marcar como Livre
                        </button>
                        
                        <button 
                            className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
                            onClick={() => mudarStatus(mesaSelecionada, 'ocupada')}
                        >
                            Marcar como Ocupada
                        </button>
                        
                        <button 
                            className="bg-orange-400 text-white px-4 py-3 rounded-lg hover:bg-orange-500 transition-colors font-medium"
                            onClick={() => mudarStatus(mesaSelecionada, 'aguardando_pedido')}
                        >
                            Aguardando Pedido
                        </button>
                        
                        <button 
                            className="bg-yellow-300 text-white px-4 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
                            onClick={() => mudarStatus(mesaSelecionada, 'novo_pedido')}
                        >
                            Novo Pedido
                        </button>
                        
                        <button 
                            className="bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                            onClick={() => mudarStatus(mesaSelecionada, 'fechamento_solicitado')}
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
        </div>
    )
}

export default Mesas;