import MesaCard from "./MesaCard";

function SecaoCard({nome, mesas, onMesaClick}) {

    return(
        <div className="rounded-2xl px-4 border-2 border-gray-300 flex flex-col pb-2 w-full shadow-md text-white" >
            <h1 className="text-3xl font-bold text-black text-center">{nome}</h1>
            <div className="grid grid-cols-2 gap-4 mt-4 w-full justify-center">
                
                {mesas.map((mesa) => (
                    <MesaCard
                        key={mesa.numero}
                        numero={mesa.numero}
                        status={mesa.status}
                        onClick={() => {
                            onMesaClick(mesa.numero);
                        }}

                    />
                ))}
            </div>
        </div>
    );

}

export default SecaoCard;
