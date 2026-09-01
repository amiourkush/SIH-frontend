import {
  MapContainer,
  TileLayer,
  Polyline,
  useMap,
} from "react-leaflet";

import { useEffect, useMemo } from "react";

import { useTrains } from "../../hooks/useTrains";

import TrainMarker from "./TrainMarker";
import StationMarker from "./StationMarker";
import LiveTrainOverlay from "./LiveTrainOverlay";


/* =========================================================
   MAP AUTO CENTER
   ========================================================= */

function MapUpdater({ train }) {
  const map = useMap();

  useEffect(() => {
    if (!train) {
      return;
    }

    map.flyTo(
      [train.latitude, train.longitude],
      8,
      {
        duration: 0.8,
      }
    );
  }, [train, map]);

  return null;
}


/* =========================================================
   LIVE TRAIN MAP
   ========================================================= */

export default function LiveTrainMap({
  trainsOverride,
}) {

  const {
    trains: reduxTrains,
    selectedTrain,
    selectTrain,
    clearSelectedTrain,
  } = useTrains();

  const trains =
    trainsOverride ?? reduxTrains;

  /* =======================================================
     SELECTED ROUTE
     ======================================================= */

  const routePositions = useMemo(() => {
    if (!selectedTrain?.stations) {
      return [];
    }

    return selectedTrain.stations.map(
      (station) => [
        station.latitude,
        station.longitude,
      ]
    );
  }, [selectedTrain]);


  return (
    <div className="relative h-full w-full">

      <MapContainer
        center={[
          24.5,
          77.5,
        ]}
        zoom={6}
        minZoom={5}
        maxZoom={16}
        scrollWheelZoom={true}
        className="h-full w-full"
      >

        {/* ================= OPEN STREET MAP ================= */}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {/* ================= SELECTED ROUTE ================= */}

        {routePositions.length > 1 && (
          <Polyline
            positions={routePositions}
            pathOptions={{
              color: "#253f69",
              weight: 4,
              opacity: 0.8,
            }}
          />
        )}


        {/* ================= ALL TRAINS ================= */}

        {trains.map((train) => (
          <TrainMarker
            key={train.number}
            train={train}
            onSelect={selectTrain}
          />
        ))}


        {/* ================= STATIONS ================= */}

        {selectedTrain?.stations?.map(
          (station) => (
            <StationMarker
              key={`${selectedTrain.number}-${station.code}`}
              station={station}
            />
          )
        )}


        {/* ================= MAP UPDATER ================= */}

        <MapUpdater
          train={selectedTrain}
        />

      </MapContainer>


      {/* ================= TRAIN DETAILS ================= */}

      <LiveTrainOverlay
        train={selectedTrain}
        onClose={clearSelectedTrain}
      />


      {/* ================= MAP LEGEND ================= */}

      <div
        className="
          absolute
          bottom-4
          right-4
          z-[1000]
          hidden
          rounded-lg
          border
          border-gray-200
          bg-white
          p-3
          shadow-md
          sm:block
        "
      >

        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
          Legend
        </p>

        <div className="space-y-1.5">

          <LegendItem
            color="#071b3b"
            label="Current Train"
          />

          <LegendItem
            color="#64748b"
            label="Completed Station"
          />

          <LegendItem
            color="#ffffff"
            border
            label="Upcoming Station"
          />

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   LEGEND ITEM
   ========================================================= */

function LegendItem({
  color,
  label,
  border = false,
}) {
  return (
    <div className="flex items-center gap-2">

      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{
          backgroundColor: color,
          border: border
            ? "1px solid #94a3b8"
            : "none",
        }}
      />

      <span className="text-[10px] text-gray-600">
        {label}
      </span>

    </div>
  );
}