import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function DashboardLayout() {
  return (
    <div className="grid h-dvh grid-cols-[clamp(13rem,15vw,16rem)_minmax(0,1fr)] overflow-hidden bg-[#f8f8fa]">

      {/* Sidebar */}
      <Sidebar />

      {/* Application area */}
      <div className="flex min-h-0 min-w-0 flex-col">

        {/* Top navigation */}
        <Topbar />

        {/* Page content */}
        <main className="min-h-0 min-w-0 flex-1 overflow-hidden">
          <Outlet />
        </main>

      </div>

    </div>
  );
}