import Logo from "../../components/UI/Logo";

function HomeStaff() {
    return (
        <div className="mx-auto flex flex-col gap-1 w-full p-2 max-w-sm md:max-w-md lg:max-w-lg">
            <div className="flex flex-col items-center gap-2" >
                <Logo />
                <h2 className="text-center text-lg md:text-2xl font-bold">Bem-vindo ao Anota Aí</h2>
                <p className="p-2 text-center text-lg md:text-2xl w-full">
                    Digite suas credenciais para continuar.
                </p>
            </div>
            <form 
            action="submit" 
            className="w-full flex flex-col items-start">
                <label 
                htmlFor="email"
                className="font-semibold text-start">
                    Email:
                </label>
                <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Digite seu email"
                className="border border-gray-300 rounded-md p-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-900 w-full"
                required />
                <label 
                htmlFor="password"
                className="font-semibold text-start">
                    Senha:
                </label>
                <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Digite sua senha"
                className="border border-gray-300 rounded-md p-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-900 w-full"
                required />
                <button 
                type="submit"
                className="bg-[#556B2F] w-full text-white rounded-md p-2 mb-4 px-4 mt-4 hover:bg-[#556B2F] focus:outline-none focus:ring-2 focus:ring-[#556B2F]">
                    Continuar
                </button>
            </form>
        </div>
    );
}

export default HomeStaff;