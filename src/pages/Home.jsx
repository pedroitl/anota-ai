import { useNavigate } from 'react-router-dom';
import Logo from '../components/UI/Logo';

function Home(){
  const navigate = useNavigate();

  return(
    <div className='bg-[#fdfdfd] font-sans  p-2 w-screen h-screen text-center '>
      <Logo />
      <button onClick = {() => navigate("/home-cliente")} 
      className='bg-[#fdfdfd] border-2 border-[#000000] rounded-lg px-4 py-2 text-lg font-bold mt-4 hover:bg-[#000000] hover:text-[#fdfdfd] transition-colors duration-300'>
         Cliente path
      </button>
      <button onClick={() => navigate("/home-funcionario")} 
      className='bg-[#fdfdfd] border-2 border-[#000000] rounded-lg px-4 py-2 text-lg font-bold mt-4 hover:bg-[#000000] hover:text-[#fdfdfd] transition-colors duration-300'>
          Funcionario path
      </button>
    </div>
  )
}

export default Home;