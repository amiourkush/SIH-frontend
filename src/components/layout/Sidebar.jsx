import {
  LayoutDashboard,
  TrainFront,
  Timer,
  Train,
  Map,
  ChartNoAxesColumn,
  Bell,
  Sparkles,
  Settings,
  TriangleAlert,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Live Trains",
    path: "/live-trains",
    icon: TrainFront,
  },
  {
    label: "ETA Predictions",
    path: "/eta-predictions",
    icon: Timer,
  },
  {
    label: "Train Details",
    path: "/train-details",
    icon: Train,
  },
  {
    label: "Route & Stations",
    path: "/routes-stations",
    icon: Map,
  },
  {
    label: "Delay Analytics",
    path: "/delay-analytics",
    icon: ChartNoAxesColumn,
  },
  {
    label: "Alerts",
    path: "/alerts",
    icon: Bell,
  },
  {
    label: "AI Insights",
    path: "/ai-insights",
    icon: Sparkles,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
   <aside className="flex h-dvh min-h-0 w-full flex-col bg-[#061a3a] text-white">

      {/* ================= LOGO ================= */}

      <div className="flex shrink-0 items-center gap-3 px-5 py-5">

        <TrainFront
          className="h-6 w-6 shrink-0"
          strokeWidth={2}
        />

        <div className="min-w-0">

          <h1 className="text-base font-bold leading-none tracking-tight sm:text-lg">
            RailETA AI
          </h1>

          <p className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.15em] text-slate-300">
            Network Operations
          </p>

        </div>

      </div>


      {/* ================= NAVIGATION ================= */}

      <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-2">

        <div className="flex flex-col gap-1">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#a9c7ff] text-[#18345d]"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon
                  className="h-5 w-5 shrink-0"
                  strokeWidth={1.8}
                />

                <span className="truncate">
                  {item.label}
                </span>
              </NavLink>
            );
          })}

        </div>

      </nav>


      {/* ================= EMERGENCY ================= */}

      <div className="shrink-0 p-4">

        <button
          type="button"
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-[#ef1515]
            px-3
            py-3
            text-xs
            font-bold
            uppercase
            tracking-wide
            text-white
            transition
            hover:bg-red-700
          "
        >

          <TriangleAlert className="h-4 w-4 shrink-0" />

          <span>Emergency Protocol</span>

        </button>

      </div>

    </aside>
  );
}