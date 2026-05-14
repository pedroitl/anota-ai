import logo from '../../assets/logo-anota-ai.png';

function Logo() {

    return (
        <div className='mx-auto flex flex-col gap-1 items-center max-w-sm p-2'> 
            <img src={logo} alt="Logo Anota Ai" className="h-36 md:h-56"/>
            <span className="text-lg md:text-2xl">ANOTA AÍ</span>
        </div>
    );
}

export default Logo;