import Logo from "../../../components/UI/Logo";
import Rodape from "../../../components/Footer";

function FinalizarMesa() {
    return (
        <div className="mx-auto flex flex-col gap-1 w-full p-2 max-w-sm md:max-w-md lg:max-w-lg">
            <Logo />
            <h1 className="text-center text-lg md:text-2xl font-bold">Finalizar Mesa</h1>
            <Rodape/>
        </div>
    )
}

export default FinalizarMesa;