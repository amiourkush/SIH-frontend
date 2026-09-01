import {
  CircleMarker,
  Tooltip,
  Popup,
} from "react-leaflet";


export default function StationMarker({
  station,
}) {

  const isCurrent =
    station.status === "current";

  const isCompleted =
    station.status === "completed";


  const fillColor =
    isCurrent
      ? "#071b3b"
      : isCompleted
        ? "#64748b"
        : "#ffffff";


  const borderColor =
    isCurrent
      ? "#071b3b"
      : isCompleted
        ? "#64748b"
        : "#94a3b8";


  return (
    <CircleMarker
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
        color: borderColor,
        fillColor,
        fillOpacity: 1,
        weight: 2,
      }}
    >

      {/* =================================================
          HOVER
          ================================================= */}

      <Tooltip
        direction="top"
        offset={[0, -6]}
        opacity={1}
      >

        <div className="min-w-[145px]">

          <p className="text-xs font-semibold text-gray-800">
            {station.name}
          </p>

          <p className="mt-0.5 text-[10px] text-gray-500">
            {station.code}
          </p>

          <div className="mt-2 flex items-center justify-between gap-4">

            <span className="text-[10px] text-gray-500">
              Predicted ETA
            </span>

            <span className="text-[10px] font-semibold text-[#071b3b]">
              {station.predictedArrival || station.eta}
            </span>

          </div>

        </div>

      </Tooltip>


      {/* =================================================
          CLICK POPUP
          ================================================= */}

      <Popup>

        <div className="min-w-[190px]">

          <p className="text-sm font-semibold text-gray-800">
            {station.name}
          </p>

          <p className="mt-0.5 text-xs text-gray-500">
            {station.code}
          </p>


          <div className="mt-3 space-y-2">

            <div className="flex justify-between gap-4">

              <span className="text-xs text-gray-500">
                Scheduled
              </span>

              <span className="text-xs font-medium">
                {station.scheduledArrival ||
                  "—"}
              </span>

            </div>


            <div className="flex justify-between gap-4">

              <span className="text-xs text-gray-500">
                Predicted
              </span>

              <span className="text-xs font-semibold text-[#071b3b]">
                {station.predictedArrival ||
                  station.eta ||
                  "—"}
              </span>

            </div>


            <div className="flex justify-between gap-4">

              <span className="text-xs text-gray-500">
                Delay
              </span>

              <span className="text-xs font-medium text-orange-500">
                {station.delay || "On Time"}
              </span>

            </div>


            <div className="flex justify-between gap-4">

              <span className="text-xs text-gray-500">
                Status
              </span>

              <span className="text-xs font-medium capitalize">
                {station.status}
              </span>

            </div>

          </div>

        </div>

      </Popup>

    </CircleMarker>
  );
}