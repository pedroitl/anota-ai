import BannerHome from '../assets/banner-home.svg';
import BannerSide from '../assets/banner-home-side.svg';
import { useNavigate } from 'react-router-dom'; 

function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-start w-full min-h-screen bg-gray-100 pt-0">
            <div className="w-full mb-12">
                <img src={BannerHome} alt="banner" className="block w-full max-w-full mb-4 rounded-lg" />
            </div>
            <div className="w-full max-w-5xl mx-auto px-6 py-12">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Como funciona?
                    </h2>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { step: "01", title: "Crie sua conta", desc: "Cadastre-se na plataforma rapidamente." },
                        { step: "02", title: "Escolha seus pratos", desc: "Verifique o cardápio e selecione seus itens favoritos." },
                        { step: "03", title: "Faça seu pedido", desc: "Realize seu pedido de forma rápida e prática." },
                        { step: "04", title: "Aproveite sua refeição", desc: "Desfrute de uma experiência de atendimento excepcional." },
                    ].map((item, index) => (
                        <div key={index} className="relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <span className="text-[#7A1F2B] font-bold text-sm tracking-widest uppercase block mb-1">Passo {item.step}</span>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-sm text-[#6B7280] leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-6 w-full max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button 
                        className="flex-1 cursor-pointer sm:flex-none px-5 py-2.5 bg-[#556B2F] hover:bg-[#4A5A28] text-white text-sm font-semibold rounded-lg shadow-sm whitespace-nowrap"
                        onClick={() => navigate('/cadastro')}>
                            Criar Conta Grátis
                        </button>
                        <button 
                        className="flex-1 cursor-pointer sm:flex-none px-5 py-2.5 bg-gray-50 hover:bg-[#d8e7ca] text-gray-700 text-sm font-semibold rounded-lg border border-gray-200 whitespace-nowrap"
                        onClick={() => navigate('/login')}>
                            Fazer Login
                        </button>
                    </div>
            </div>  
           <div className="w-full max-w-5xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-10 md:gap-16 items-center justify-between">
                <div className="flex-1 max-w-xl">
                    <p className="text-lg text-gray-600 leading-relaxed text-justify md:text-left">
                        O <strong className="text-gray-900 font-semibold">Anota AI</strong> é uma plataforma desenvolvida para modernizar e simplificar a gestão de restaurantes. 
                        Com uma interface intuitiva e recursos integrados, o system permite controlar mesas, 
                        pedidos, cardápio e atendimento em um único lugar, proporcionando mais organização, agilidade e eficiência para o estabelecimento.
                    </p>
                </div>
                <div className="hidden md:block w-px shrink-0 self-stretch bg-gray-200"></div>
                <div className="flex-1 flex justify-center w-full">
                    <img src={BannerSide} alt="banner-side" className="w-full max-w-sm h-auto rounded-2xl shadow-sm object-contain" />
                </div>
            </div>
           <div className="w-full max-w-5xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-10 md:gap-16 items-center justify-between border-t border-gray-100">
                {/* Alterado para flex-1 max-w-xl e md:text-left para espelhar perfeitamente o bloco de cima */}
                <div className="flex-1 max-w-xl text-center md:text-left">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Benefícios
                    </h2>
                </div>
                <div className="hidden md:block w-px shrink-0 self-stretch bg-gray-200"></div>
                <div className="flex-1 w-full">
                    <ul className="grid grid-cols-1 gap-4 text-gray-600 text-sm font-medium">
                        {[
                            "Controle de mesas em tempo real",
                            "Gestão simplificada de pedidos",
                            "Organização do atendimento da equipe",
                            "Cardápio digital acessível aos clientes",
                            "Redução de erros operacionais",
                            "Maior agilidade no fluxo de atendimento",
                            "Interface moderna e fácil de utilizar",
                            "Solução preparada para diferentes restaurantes"
                        ].map((beneficio, index) => (
                            <li key={index} className="flex bg-white p-3 rounded-xl shadow-sm border border-gray-50">
                                <span>{beneficio}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;