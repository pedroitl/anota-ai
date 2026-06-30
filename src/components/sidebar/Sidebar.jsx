import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import menu from "./menus";

function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const menuFiltrado = menu.filter((item) => item.roles.includes(role));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }

  return (
    <aside className="flex min-h-screen w-64 flex-col justify-between border-r border-stone-200 bg-stone-50 px-4 py-6">
      <div>
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#556B2F]">Anota Aí</h2>
          <p className="text-sm text-stone-500">Área do sistema</p>
        </div>

        <nav className="flex flex-col gap-1">
          {menuFiltrado.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#556B2F]/10 text-[#556B2F]"
                      : "text-stone-700 hover:bg-stone-100 hover:text-[#556B2F]"
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.texto}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <LogOut size={18} />
        <span>Sair</span>
      </button>
    </aside>
  );
}

export default Sidebar;