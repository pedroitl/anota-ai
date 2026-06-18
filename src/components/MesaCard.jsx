
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
        <div className={`${getCorStatus(status)} flex justify-center items-center aspect-square rounded-xl cursor-pointer hover:opacity-90 shadow-md text-white`}  onClick={onClick}>
            <p className="text-3xl font-bold">{numero}</p>
        </div>
    );

}

export default MesaCard;

