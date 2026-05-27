
function MesaCard({numero, status, onClick}) {


    function getCorStatus(status){
        if (status === 'Livre'){
            return 'bg-[#556B2F]';
        } else if(status === 'Ocupada'){
            return 'bg-[#7A1F2B]'
        }else if(status === 'Aguardando Pedido'){
            return 'bg-[#B85C38]'
        }else if(status === 'Novo Pedido'){
            return 'bg-[#C8A44D]'
        }else if(status === 'Fechamento Solicitado'){
            return 'bg-[#4E5047]'
        }
    }


    return(
        <div className={`${getCorStatus(status)} rounded-2xl px-4 cursor-pointer hover:opacity-90 
            transition-opacity flex flex-col items-center justify-center h-44 w-full shadow-md text-white`}  onClick={onClick}>
            <p className="text-3xl font-bold">{numero}</p>
            <p className="text-xl sm:text-sm mt-3 text-center wrap-break-word max-w-full leading-tight font-light ">{status}</p>
        </div>
    );

}

export default MesaCard;

