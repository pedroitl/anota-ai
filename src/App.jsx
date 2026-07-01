import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";

import Cardapio from "./pages/customer/Cardapio";
import CustomerRegister from "./pages/customer/CustomerRegister";
import Paths from "./pages/Paths";
import Login from "./pages/Login";
import Home from "./pages/Home";

import StaffLayout from "./layouts/StaffLayout";

import Mesas from "./pages/staff/waiter/Mesas";
import Pedidos from "./pages/staff/waiter/Pedidos";
import Notificacoes from "./pages/staff/waiter/Notificacoes";

import PedidosCozinha from "./pages/staff/kitchen/PedidosCozinha";

import MesasCashier from "./pages/staff/cashier/MesasCashier";
import FinalizarMesa from "./pages/staff/cashier/FinalizarMesa";

import Relatorios from "./pages/staff/manager/Relatorios";
import DashboardGerente from "./pages/staff/manager/DashboardGerente";
import PedidosGerente from "./pages/staff/manager/PedidosGerente";
import CozinhaGerente from "./pages/staff/manager/CozinhaGerente";
import MesasGerente from "./pages/staff/manager/MesasGerente";
import FuncionariosGerente from "./pages/staff/manager/FuncionariosGerente";
import CaixaGerente from "./pages/staff/manager/CaixaGerente";
import ConfiguracoesGerente from "./pages/staff/manager/ConfiguracoesGerente";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Paths />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<CustomerRegister />} />
      <Route path="/home" element={<Home />} />

      <Route
        path="/home-cliente/cardapio"
        element={
            <Cardapio />
        }
      />

      <Route
        path="/home-funcionario/waiter"
        element={
            <StaffLayout />
        }
      >
        <Route index element={<Mesas />} />
        <Route path="mesas" element={<Mesas />} />
        <Route path="pedidos" element={<Pedidos />} />
        <Route path="notificacoes" element={<Notificacoes />} />
      </Route>

      <Route
        path="/home-funcionario/kitchen"
        element={
            <StaffLayout />
        }
      >
        <Route index element={<PedidosCozinha />} />
        <Route path="pedidos" element={<PedidosCozinha />} />
      </Route>

      <Route
        path="/home-funcionario/cashier"
        element={
            <StaffLayout />
        }
      >
        <Route index element={<MesasCashier />} />
        <Route path="mesas" element={<MesasCashier />} />
        <Route path="finalizar" element={<FinalizarMesa />} />
      </Route>

      <Route
        path="/home-funcionario/manager"
        element={
          <ProtectedRoutes allowedRoles="MANAGER">
            <StaffLayout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<DashboardGerente />} />
        <Route path="dashboard" element={<DashboardGerente />} />
        <Route path="pedidos" element={<PedidosGerente />} />
        <Route path="cozinha" element={<CozinhaGerente />} />
        <Route path="mesas" element={<MesasGerente />} />
        <Route path="funcionarios" element={<FuncionariosGerente />} />
        <Route path="caixa" element={<CaixaGerente />} />
        <Route path="relatorios" element={<Relatorios />} />
        <Route path="configuracoes" element={<ConfiguracoesGerente />} />
      </Route>
    </Routes>
  );
}

export default App;
