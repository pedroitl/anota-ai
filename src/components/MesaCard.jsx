function MesaCard({ numero, status, onClick }) {
  const statusRecebido = String(status ?? "").trim();

  const coresPorStatus = {
    LIVRE: "#556B2F",
    OCUPADA: "#7A1F2B",
    AGUARDANDO_PEDIDO: "#B85C38",
    NOVO_PEDIDO: "#C8A44D",
    FECHAMENTO_SOLICITADO: "#4E5047"
  };

  const cor = coresPorStatus[statusRecebido] || "#9CA3AF";

  return (
    <div
      style={{ backgroundColor: cor }}
      className="flex justify-center items-center aspect-square rounded-xl cursor-pointer hover:opacity-90 shadow-md text-white"
      onClick={onClick}
    >
      <p className="text-3xl font-bold">{numero}</p>
    </div>
  );
}

export default MesaCard;