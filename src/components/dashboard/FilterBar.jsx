import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { useTrains } from "../../hooks/useTrains";

const ZONES = [
  "North",
  "Western",
];

const TRAIN_TYPES = [
  "Express",
  "Vande Bharat",
  "Mail",
  "Rajdhani",
];

export default function FilterBar() {
  const {
    filters,
    setStatusFilter,
    setZoneFilter,
    setTrainTypeFilter,
  } = useTrains();

  const {
    status,
    zone,
    trainType,
  } = filters;

  // Local UI state — does NOT need Redux.
  const [openDropdown, setOpenDropdown] = useState(null);

  const buttonBase =
    "rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition sm:px-4 sm:py-2";

  const statusButton = (value) => {
    return `${buttonBase} ${
      status === value
        ? "bg-[#071b3b] text-white"
        : "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
    }`;
  };

  const handleZoneChange = (value) => {
    setZoneFilter(value);
    setOpenDropdown(null);
  };

  const handleTrainTypeChange = (value) => {
    setTrainTypeFilter(value);
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown((current) =>
      current === dropdown ? null : dropdown
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-2">

      {/* ================= STATUS FILTERS ================= */}

      <button
        type="button"
        onClick={() => setStatusFilter("all")}
        className={statusButton("all")}
      >
        All Trains
      </button>

      <button
        type="button"
        onClick={() => setStatusFilter("on-time")}
        className={statusButton("on-time")}
      >
        On Time
      </button>

      <button
        type="button"
        onClick={() => setStatusFilter("delayed")}
        className={statusButton("delayed")}
      >
        Delayed
      </button>

      <button
        type="button"
        onClick={() => setStatusFilter("critical")}
        className={`${buttonBase} ${
          status === "critical"
            ? "bg-red-500 text-white"
            : "border border-[#ffbdbd] bg-white text-red-500 hover:bg-red-50"
        }`}
      >
        Critical
      </button>


      {/* ================= ZONE DROPDOWN ================= */}

      <div className="relative">

        <button
          type="button"
          onClick={() => toggleDropdown("zone")}
          aria-expanded={openDropdown === "zone"}
          className={`${buttonBase} flex items-center gap-1.5 border border-gray-300 bg-white text-gray-600 hover:bg-gray-50`}
        >
          {zone === "all" ? "Zone" : zone}

          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${
              openDropdown === "zone"
                ? "rotate-180"
                : ""
            }`}
          />
        </button>

        {openDropdown === "zone" && (
          <div className="absolute left-0 top-full z-30 mt-2 min-w-40 overflow-hidden rounded-lg border border-gray-200 bg-white p-1.5 shadow-lg">

            <button
              type="button"
              onClick={() => handleZoneChange("all")}
              className={`w-full rounded-md px-3 py-2 text-left text-xs transition ${
                zone === "all"
                  ? "bg-[#071b3b] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All Zones
            </button>

            {ZONES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleZoneChange(item)}
                className={`w-full rounded-md px-3 py-2 text-left text-xs transition ${
                  zone === item
                    ? "bg-[#071b3b] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            ))}

          </div>
        )}

      </div>


      {/* ================= TRAIN TYPE DROPDOWN ================= */}

      <div className="relative">

        <button
          type="button"
          onClick={() =>
            toggleDropdown("trainType")
          }
          aria-expanded={
            openDropdown === "trainType"
          }
          className={`${buttonBase} flex items-center gap-1.5 border border-gray-300 bg-white text-gray-600 hover:bg-gray-50`}
        >
          {trainType === "all"
            ? "Train Type"
            : trainType}

          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${
              openDropdown === "trainType"
                ? "rotate-180"
                : ""
            }`}
          />
        </button>

        {openDropdown === "trainType" && (
          <div className="absolute left-0 top-full z-30 mt-2 min-w-44 overflow-hidden rounded-lg border border-gray-200 bg-white p-1.5 shadow-lg">

            <button
              type="button"
              onClick={() =>
                handleTrainTypeChange("all")
              }
              className={`w-full rounded-md px-3 py-2 text-left text-xs transition ${
                trainType === "all"
                  ? "bg-[#071b3b] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All Types
            </button>

            {TRAIN_TYPES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  handleTrainTypeChange(item)
                }
                className={`w-full rounded-md px-3 py-2 text-left text-xs transition ${
                  trainType === item
                    ? "bg-[#071b3b] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}