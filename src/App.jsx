import Cardapio from './components/Cardapio';
import {Routes, Route } from 'react-router-dom';

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
          <Route path="/cardapio" element={<Cardapio />} />
        </Routes>
      
    </>

  )
}

export default App;
