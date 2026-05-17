import Logo from './components/UI/Logo.jsx';
import CustomerRegister from './components/CustomerRegister';
import Cardapio from './components/Cardapio';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeCustomer from './pages/customer/HomeCustomer.jsx';
function Home(){
  return(
  <div className='bg-[#fdfdfd] font-sans  p-2 w-screen h-screen text-center '>
          <Logo />
          <h1 className="text-lg md:text-2xl font-bold">Bem-vindo ao Anota Aí</h1>
          <p className="p-2 text-lg md:text-2xl w-full">Antes de começar seu pedido, 
          precisamos de algumas informações rápidas para garantir um atendimento mais ágil e organizado.
          </p>
          <CustomerRegister />
        </div>
        )
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home-cliente" element={<HomeCustomer />} />
          <Route path="/cardapio" element={<Cardapio />} />
        </Routes>
      </Router>
      
      </>

  )
}

export default App;
