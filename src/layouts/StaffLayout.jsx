import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function StaffLayout() {
  return (
    <div className="staff-layout">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default StaffLayout;