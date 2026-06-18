import SecaoCard from "../../../components/SecaoCard";

function MesasSecao() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f5f5] w-full box-border overflow-x-hidden p-4 gap-7 sm:p-8">
            <div className="mb-8 flex flex-col items-center justify-center gap-2">
                <h1 className="text-3xl font-bold text-center">Mesas</h1>
                <p className="text-sm text-gray-600 italic">
                    Status: Verde = Livre, Vermelho = Ocupada, Laranja = Aguardando Pedido, Amarelo = Novo Pedido, Cinza = Fechamento Solicitado.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 w-full">
                <SecaoCard nome="Lounge" mesas={[{numero: 1, status: 'Livre'}, {numero: 2, status: 'Ocupada'}, {numero: 3, status: 'Livre'}, {numero: 4, status: 'Ocupada'}]} />
                <SecaoCard nome="Area VIP" mesas={[{numero: 3, status: 'Aguardando Pedido'}, {numero: 4, status: 'Novo Pedido'}, {numero: 5, status: 'Livre'}, {numero: 6, status: 'Ocupada'}]} />
                <SecaoCard nome="Interna" mesas={[{numero: 5, status: 'Fechamento Solicitado'}, {numero: 6, status: 'Livre'}, {numero: 7, status: 'Ocupada'}, {numero: 8, status: 'Livre'}]} />
            </div>
        </div>
    )
}

export default MesasSecao;
