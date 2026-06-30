import { NavLink } from "react-router-dom";
import menu from "./menus";
import { LogOut } from "lucide-react";

function Sidebar() {

    return (
        <aside className="sidebar">
            <h2>Logo</h2>
            <nav>
                {
                    menu.map(item => (
                        <NavLink to={item.path} key={item.path}>
                            <item.icon />
                            <span>{item.texto}</span>
                        </NavLink>
                    ))
                }
            </nav>
            <button>
                <LogOut />
            
                <span>Sair</span>
            </button>
        </aside>
    );
}

export default Sidebar;