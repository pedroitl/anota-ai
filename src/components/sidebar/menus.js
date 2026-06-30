import {
  LayoutDashboard,
  ClipboardList,
  ChefHat,
  Users,
  Wallet,
  BarChart3,
  Settings,
  Bell,
  UtensilsCrossed,
} from "lucide-react";

const menu = [
  {
    path: "/home-funcionario/manager/dashboard",
    texto: "Dashboard",
    icon: LayoutDashboard,
    roles: ["MANAGER"],
  },
  {
    path: "/home-funcionario/manager/pedidos",
    texto: "Pedidos",
    icon: ClipboardList,
    roles: ["MANAGER"],
  },
  {
    path: "/home-funcionario/manager/cozinha",
    texto: "Cozinha",
    icon: ChefHat,
    roles: ["MANAGER"],
  },
  {
    path: "/home-funcionario/manager/funcionarios",
    texto: "Funcionários",
    icon: Users,
    roles: ["MANAGER"],
  },
  {
    path: "/home-funcionario/manager/caixa",
    texto: "Caixa",
    icon: Wallet,
    roles: ["MANAGER"],
  },
  {
    path: "/home-funcionario/manager/relatorios",
    texto: "Relatórios",
    icon: BarChart3,
    roles: ["MANAGER"],
  },
  {
    path: "/home-funcionario/manager/configuracoes",
    texto: "Configurações",
    icon: Settings,
    roles: ["MANAGER"],
  },
  {
    path: "/home-funcionario/waiter/mesas",
    texto: "Mesas",
    icon: UtensilsCrossed,
    roles: ["WAITER"],
  },
  {
    path: "/home-funcionario/waiter/pedidos",
    texto: "Pedidos",
    icon: ClipboardList,
    roles: ["WAITER"],
  },
  {
    path: "/home-funcionario/waiter/notificacoes",
    texto: "Notificações",
    icon: Bell,
    roles: ["WAITER"],
  },
  {
    path: "/home-funcionario/kitchen/pedidos",
    texto: "Pedidos",
    icon: ChefHat,
    roles: ["KITCHEN"],
  },
  {
    path: "/home-funcionario/cashier/mesas",
    texto: "Mesas",
    icon: Wallet,
    roles: ["DESK"],
  },
];

export default menu;