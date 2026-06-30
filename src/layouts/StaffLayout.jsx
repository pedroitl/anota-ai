import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function StaffLayout() {
  return (
    <div className="flex min-h-screen bg-[#f8f8f5]">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default StaffLayout;