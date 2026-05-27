//cliente = cardapio, pedidos
//garçom = pedidos, mesas, cardapio, notificacoes
//cozinha = pedidos, notificacoes
//admin = cardapio, mesas, pedidos, usuarios
//gerente = cardapio, mesas, pedidos, usuarios, relatorios

const users = [
    {
        id: 1,
        email: "garçom@gmail.com",
        password: "garçom123",
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
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin"
    },
    {
      id: 5,
      email: "gerente@gmail.com",
      password: "gerente123",
      role: "manager"
    }
];
