import CustomerRegister from "../../components/CustomerRegister";
import { useNavigate } from "react-router-dom";


function HomeCustomer() {
    const navigate = useNavigate();
    
    return (
        <div>           
           {/* <CustomerRegister /> */}
           
                <button onClick={() => navigate("/cardapio")}>Cardapio</button>
        </div>
        //Pagina inicial do cliente
        //contem logo
        //abaixo uma mensagem de boas vindas e uma breve explicação do que o cliente deve fazer para iniciar seu pedido
        //abaixo tem os preenchimentos, nome completo, telefone, cpf e a identificação da mesa
        //abaixo tera o botao para continuar para a proxima tela
    );
}

export default HomeCustomer;