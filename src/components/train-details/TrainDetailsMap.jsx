import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Tooltip,
  Marker,
} from "react-leaflet";

import L from "leaflet";

import {
  useMemo,
} from "react";


export default function TrainDetailsMap({
  train,
}) {

  const stations =
    train.stations || [];


  /* =======================================================
     ROUTE
     ======================================================= */

  const route =
    useMemo(() => {

      return stations.map(
        (station) => [
          station.latitude,
          station.longitude,
        ]
      );

    }, [stations]);


  /* =======================================================
     TRAIN ICON
     ======================================================= */

  const trainIcon =
    useMemo(
      () =>
        L.divIcon({

          className:
            "train-details-marker",

          html: `
            <div
              style="
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: #071b3b;
                border: 3px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              "
            ></div>
          `,

          iconSize: [
            16,
            16,
          ],

          iconAnchor: [
            8,
            8,
          ],

        }),
      []
    );


  /* =======================================================
     MAP CENTER
     ======================================================= */

  const center = [
    train.latitude,
    train.longitude,
  ];


  return (
    <section
      className="
        relative
        min-h-[500px]
        overflow-hidden
        rounded-xl
        border
        border-[#d8dbe2]
        bg-[#d9efd9]
        shadow-sm
      "
    >

      <MapContainer
        center={center}
        zoom={8}
        scrollWheelZoom
        className="h-full min-h-[500px] w-full"
      >

        {/* =================================================
            OPEN STREET MAP
            ================================================= */}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {/* =================================================
            PLANNED ROUTE
            ================================================= */}

        {route.length > 1 && (

          <Polyline
            positions={route}
            pathOptions={{
              color: "#253f69",
              weight: 4,
              opacity: 0.85,
            }}
          />

        )}


        {/* =================================================
            STATIONS
            ================================================= */}

        {stations.map(
          (station) => {

            const isCurrent =
              station.status ===
              "current";

            const isCompleted =
              station.status ===
              "completed";


            return (
              <CircleMarker
                key={station.code}
                center={[
                  station.latitude,
                  station.longitude,
                ]}
                radius={
                  isCurrent
                    ? 7
                    : 5
                }
                pathOptions={{
                  color:
                    isCurrent
                      ? "#dc2626"
                      : isCompleted
                        ? "#64748b"
                        : "#253f69",

                  fillColor:
                    isCurrent
                      ? "#ffffff"
                      : isCompleted
                        ? "#64748b"
                        : "#ffffff",

                  fillOpacity: 1,

                  weight: 2,
                }}
              >

                <Tooltip
                  direction="top"
                  offset={[
                    0,
                    -5,
                  ]}
                  opacity={1}
                >

                  <div className="text-xs">

                    <p className="font-semibold">
                      {station.name}
                    </p>

                    <p className="text-gray-500">
                      {station.code}
                    </p>

                    <p className="mt-1">
                      ETA:{" "}
                      <strong>
                        {station.eta}
                      </strong>
                    </p>

                  </div>

                </Tooltip>

              </CircleMarker>
            );

          }
        )}


        {/* =================================================
            CURRENT TRAIN
            ================================================= */}

        <Marker
          position={center}
          icon={trainIcon}
        >

          <Tooltip
            direction="top"
            offset={[
              0,
              -8,
            ]}
            permanent={false}
          >

            <div className="text-xs">

              <p className="font-semibold">
                {train.number} · {train.name}
              </p>

              <p className="mt-1">
                Current location:{" "}
                <strong>
                  {train.location}
                </strong>
              </p>

              <p>
                Speed:{" "}
                <strong>
                  {train.speed} km/h
                </strong>
              </p>

            </div>

          </Tooltip>

        </Marker>

      </MapContainer>


      {/* ===================================================
          MAP LEGEND
          =================================================== */}

      <div
        className="
          absolute
          left-3
          top-3
          z-[1000]
          rounded-lg
          border
          border-gray-200
          bg-white/95
          p-3
          shadow-md
          backdrop-blur
        "
      >

        <p className="mb-2 text-[9px] font-semibold uppercase tracking-wide text-gray-500">
          Route
        </p>


        <div className="space-y-1.5">

          <LegendItem
            type="train"
            label="Current Train"
          />

          <LegendItem
            type="completed"
            label="Completed"
          />

          <LegendItem
            type="upcoming"
            label="Upcoming"
          />

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   LEGEND ITEM
   ========================================================= */

function LegendItem({
  type,
  label,
}) {

  return (
    <div className="flex items-center gap-2">

      <span
        className={`
          block
          h-2.5
          w-2.5
          rounded-full
          border
          ${
            type === "train"
              ? "border-white bg-[#071b3b] shadow-sm"
              : type === "completed"
                ? "border-[#64748b] bg-[#64748b]"
                : "border-[#253f69] bg-white"
          }
        `}
      />

      <span className="text-[10px] text-gray-600">
        {label}
      </span>

    </div>
  );
}