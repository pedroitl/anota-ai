import MesaCard from "./MesaCard";

function SecaoCard({ nome, mesas, onMesaClick }) {
  return (
    <section className="rounded-2xl px-4 pb-6 border-2 border-gray-300 w-full shadow-md bg-white">
      <h2 className="text-3xl font-bold text-black text-center py-4">
        {nome}
      </h2>

      <div className="grid grid-cols-2 p-6 gap-6 mt-2 w-full">
        {mesas.map((mesa) => (
          <MesaCard
            key={mesa.id}
            numero={mesa.numero}
            status={mesa.status}
            onClick={() => onMesaClick(mesa.numero)}
          />
        ))}
      </div>
    </section>
  );
}

export default SecaoCard;