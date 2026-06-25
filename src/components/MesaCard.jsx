const STATUS_COLORS = {
  LIVRE: "#556B2F",
  OCUPADA: "#7A1F2B",
  AGUARDANDO_PEDIDO: "#B85C38",
  NOVO_PEDIDO: "#C8A44D",
  FECHAMENTO_SOLICITADO: "#4E5047"
};

function MesaCard({ numero, status, onClick }) {
  const statusNormalizado = String(status ?? "").trim();
  const cor = STATUS_COLORS[statusNormalizado] ?? "#9CA3AF";

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex justify-center items-center aspect-square rounded-xl shadow-md text-white hover:opacity-90 transition-opacity"
      style={{ backgroundColor: cor }}
    >
      <span className="text-3xl font-bold">{numero}</span>
    </button>
  );
}

export default MesaCard;