//cliente = cardapio, pedidos
//garçom = pedidos, mesas, cardapio, notificacoes
//cozinha = pedidos, notificacoes
//admin = cardapio, mesas, pedidos, usuarios
//gerente = cardapio, mesas, pedidos, usuarios, relatorios

const users = [
    {
        id: 1,
        email: "garcom@gmail.com",
        password: "garcom123",
        role: "waiter"
    },
    {
        id: 2,
        email: "cozinha@gmail.com",
        password: "cozinha123",
        role: "kitchen"
    },
    {
        id: 3,
        email: "caixa@gmail.com",
        password: "caixa123",       
        role: "cashier"
    },
    {
      id: 4,
      email: "gerente@gmail.com",
      password: "gerente123",
      role: "manager"
    }
];

export default users;