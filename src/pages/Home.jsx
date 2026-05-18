import { useNavigate } from 'react-router-dom';
import Logo from '../components/UI/Logo';

function Home(){
  const navigate = useNavigate();

  return(

    <div className='mx-auto flex flex-col gap-1 w-full p-2 max-w-sm md:max-w-md lg:max-w-lg'>
      <Logo />
      <div className='flex flex-col items-center justify-center gap-4 mt-6'>
        <button onClick={() => navigate("/home-cliente")}
          className='bg-[#556B2F] w-48 text-white rounded-md py-2 px-6 focus:outline-none focus:ring-2 focus:ring-[#556B2F] hover:bg-[#000000] hover:text-[#fdfdfd] transition-colors duration-300'>
          Cliente path
        </button>
        <button onClick={() => navigate("/home-funcionario")}
          className='bg-[#556B2F] w-48 text-white rounded-md py-2 px-6 focus:outline-none focus:ring-2 focus:ring-[#556B2F] hover:bg-[#000000] hover:text-[#fdfdfd] transition-colors duration-300'>
          Funcionario path
        </button>
        <button
          className='bg-[#556B2F] w-48 text-white rounded-md py-2 px-6 focus:outline-none focus:ring-2 focus:ring-[#556B2F] hover:bg-[#000000] hover:text-[#fdfdfd] transition-colors duration-300'>
          Admin Path
        </button>
      </div>

    </div>
  )
}

export default Home;