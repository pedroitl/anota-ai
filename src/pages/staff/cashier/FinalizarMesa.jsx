import Logo from "../../../components/UI/Logo";
import Rodape from "../../../components/Footer";
import { Link } from "react-router-dom";

function FinalizarMesa() {
  return (

    <div className="mx-auto flex flex-col gap-1 w-full p-2 max-w-sm md:max-w-md lg:max-w-lg">
      <Logo />

      <Link to="/home-funcionario/cashier/mesas"className="bg-gray-800 text-white px-4 py-2 rounded">
          Ir para mesas
    </Link>
    
      <h1 className="text-center text-lg md:text-2xl font-bold">
        Finalizar Mesa
      </h1>
      <Rodape />
    </div>
  );
}

export default FinalizarMesa;
