function Rodape() {
    function Operador() {
        const operador = JSON.parse(localStorage.getItem("user"));
        return operador.email;
    }

    return (
        <footer className="w-full max-w-5xl mx-auto border-t border-gray-200 mt-12 pt-4 flex flex-col items-centersm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
            <p>Atualizado em tempo real | Operador: <span className="font-semibold">{Operador()}</span></p>
        </footer>
    );
}

export default Rodape;