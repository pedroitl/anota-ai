import Cardapio from './components/Cardapio';
import {Routes, Route } from 'react-router-dom';
import Mesas from './pages/staff/waiter/Mesas';

import CustomerRegister from './pages/customer/CustomerRegister';
import Home from './pages/Home';
import HomeStaff from './pages/staff/HomeStaff';


function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home-cliente" element={<CustomerRegister />} />
          <Route path="/home-funcionario" element={<HomeStaff />} />
          <Route path="/home-cliente/cardapio" element={<Cardapio />} />
          <Route path="/home-funcionario/waiter/mesas" element={<Mesas />} />
        </Routes>
      
    </>

  )
}

export default App;
