
function MesaCard({numero, status, onClick}) {


    function getCorStatus(status){
        if (status === 'livre'){
            return 'bg-green-600';
        } else if(status === 'ocupada'){
            return 'bg-red-500'
        }else if(status === 'aguardando_pedido'){
            return 'bg-orange-400'
        }else if(status === 'novo_pedido'){
            return 'bg-yellow-300'
        }else if(status === 'fechamento_solicitado'){
            return 'bg-gray-600'
        }
    }


    return(
        <div className={`${getCorStatus(status)} rounded-b-lg p-8 cursor-pointer hover:opacity-90 
        transition-opacity flex flex-col items-center justify-center h-40`}  onClick={onClick}>
            <p className="text-6x1 font-bold text-white">{numero}</p>
            <p className="text-sm text-white mt-2 capitalize">Status: {status}</p>
            
        </div>
    );

}

export default MesaCard;

