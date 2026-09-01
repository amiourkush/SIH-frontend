import { useEffect, useState } from "react";

import {
  TrainFront,
  CheckCircle2,
  Clock3,
  TriangleAlert,
  TrendingUp,
} from "lucide-react";

import StatCard from "../components/dashboard/StatCard";
import FilterBar from "../components/dashboard/FilterBar";
import TrainList from "../components/dashboard/TrainList";
import MapView from "../components/dashboard/MapView";

import { useAppSelector } from "../hooks/reduxHooks";
import { selectDashboardStats } from "../features/trains/trainSelectors";

export default function Dashboard() {
  const stats = useAppSelector(selectDashboardStats);

  const [lastUpdated, setLastUpdated] = useState(
    "Just Now"
  );

  useEffect(() => {
    const updateTime = () => {
      setLastUpdated(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden p-4 sm:p-5 lg:p-6">

      {/* ================= HEADER ================= */}

      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">

        <h1 className="text-lg font-semibold text-[#202126] sm:text-xl">
          Network Status Overview
        </h1>

        <div className="rounded-md bg-[#f0f0f2] px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-gray-500">
          ⟳ Last Updated: {lastUpdated}
        </div>

      </div>


      {/* ================= STATISTICS ================= */}

      <div className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

        {/* Active Trains */}
        <StatCard
          title="Active Trains"
          value={stats.activeTrains}
          icon={
            <TrainFront
              className="h-4 w-4 text-[#253f69] sm:h-5 sm:w-5"
            />
          }
        />

        {/* On Time */}
        <StatCard
          title="On Time"
          value={stats.onTime}
          icon={
            <CheckCircle2
              className="h-4 w-4 text-green-500 sm:h-5 sm:w-5"
            />
          }
        />

        {/* Delayed */}
        <StatCard
          title="Delayed"
          value={stats.delayed}
          icon={
            <Clock3
              className="h-4 w-4 text-orange-500 sm:h-5 sm:w-5"
            />
          }
        />

        {/* Critical */}
        <StatCard
          title="Critical Delays"
          value={stats.critical}
          valueColor="text-red-600"
          icon={
            <TriangleAlert
              className="h-4 w-4 text-red-500 sm:h-5 sm:w-5"
            />
          }
        />

        {/* Average Delay */}
        <StatCard
          title="Avg Network Delay"
          value={stats.averageDelay}
          icon={
            <TrendingUp
              className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5"
            />
          }
        />

      </div>


      {/* ================= FILTERS ================= */}

      <div className="shrink-0">
        <FilterBar />
      </div>


      {/* ================= TRAIN LIST + MAP ================= */}

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-[minmax(17rem,32%)_minmax(0,1fr)]">

        <TrainList />

        <MapView />

      </div>

    </div>
  );
}