import Cardapio from './components/Cardapio';
import {Routes, Route } from 'react-router-dom';

import Mesas from './pages/staff/waiter/Mesas';
import CustomerRegister from './pages/customer/CustomerRegister';
import Home from './pages/Home';
import HomeStaff from './pages/staff/HomeStaff';
import PedidosCozinha from './pages/staff/kitchen/PedidosCozinha';
import FinalizarMesa from './pages/staff/cashier/FinalizarMesa';
import Relatorios from './pages/staff/manager/Relatorios';

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home-cliente" element={<CustomerRegister />} />
          <Route path="/home-funcionario" element={<HomeStaff />} />
          <Route path="/home-cliente/cardapio" element={<Cardapio />} />
          <Route path="/home-funcionario/waiter/mesas" element={<Mesas />} />
          <Route path="/home-funcionario/kitchen/pedidos" element={<PedidosCozinha />} />
          <Route path="/home-funcionario/cashier/finalizar" element={<FinalizarMesa />} />
          <Route path="/home-funcionario/manager/relatorios" element={<Relatorios />} />
        </Routes>      
    </>
  )
}

export default App;
