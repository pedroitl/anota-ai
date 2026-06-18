import {Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';

import Cardapio from './components/Cardapio';
import Mesas from './pages/staff/waiter/Mesas';
import CustomerRegister from './pages/customer/CustomerRegister';
import Paths from './pages/Paths';
import Login from './pages/Login';
import PedidosCozinha from './pages/staff/kitchen/PedidosCozinha';
import FinalizarMesa from './pages/staff/cashier/FinalizarMesa';
import Relatorios from './pages/staff/manager/Relatorios';
import MesasSecao from './pages/staff/manager/MesasSecao';


function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Paths />} />
          <Route path="/cadastro" element={ <CustomerRegister />} />
          <Route path="/secao" element={<MesasSecao />} />
           
          <Route path="/login" element={<Login />} />
          <Route path="/home-cliente/cardapio" element={
            <ProtectedRoutes allowedRoles="CLIENT">
              <Cardapio />
            </ProtectedRoutes>} />
          <Route path="/home-funcionario/waiter/mesas" element={
              <Mesas />} />
          <Route path="/home-funcionario/kitchen/pedidos" element={
            <ProtectedRoutes allowedRoles="KITCHEN">
              <PedidosCozinha />
            </ProtectedRoutes>} />
          <Route path="/home-funcionario/cashier/finalizar" element={
            <ProtectedRoutes allowedRoles="DESK">
              <FinalizarMesa />
            </ProtectedRoutes>} />
          <Route path="/home-funcionario/manager/relatorios" element={
            <ProtectedRoutes allowedRoles="MANAGER">
              <Relatorios />
            </ProtectedRoutes>} />
        </Routes>      
    </>
  )
}

export default App;
