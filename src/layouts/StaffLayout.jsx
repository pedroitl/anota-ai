import { NavLink, Outlet, useNavigate } from "react-router-dom";
import menu from "../components/sidebar/menus";
import { LogOut } from "lucide-react";

function StaffLayout() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const menuFiltrado = menu.filter((item) => item.roles?.includes(role || ""));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-[#f3f1eb] text-stone-800">
      <aside className="w-57.5 border-r border-stone-200 bg-[#f7f4ee] px-5 py-6">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold tracking-tight text-[#6f7c2f]">
            Anota Aí
          </h1>
          <p className="mt-1 text-sm text-stone-500">Área do sistema</p>
        </div>

        <nav className="flex flex-col gap-1">
          {menuFiltrado.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-[#e7dfd2] text-stone-900"
                    : "text-stone-600 hover:bg-[#efe8dd] hover:text-stone-900"
                }`
              }
            >
              {item.icon ? <item.icon size={18} /> : null}
              {item.texto}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex flex-row gap-3 mt-10 text-sm text-stone-500 transition hover:text-stone-800"
        >
          <LogOut />
          Sair
        </button>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default StaffLayout;
