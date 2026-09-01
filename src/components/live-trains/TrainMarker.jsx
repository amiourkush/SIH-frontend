import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const createTrainIcon = (status, selected) => {
  let background = "#16a34a";

  if (status === "delayed") {
    background = "#f97316";
  }

  if (status === "critical") {
    background = "#ef4444";
  }

  return L.divIcon({
    className: "",
    html: `
      <div
        style="
          width: ${selected ? "38px" : "32px"};
          height: ${selected ? "38px" : "32px"};
          border-radius: 50%;
          background: ${background};
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: ${selected ? "18px" : "15px"};
          font-weight: 700;
          transition: all 0.2s ease;
        "
      >
        🚆
      </div>
    `,
    iconSize: [
      selected ? 38 : 32,
      selected ? 38 : 32,
    ],
    iconAnchor: [
      selected ? 19 : 16,
      selected ? 19 : 16,
    ],
    popupAnchor: [0, -18],
  });
};

export default function TrainMarker({
  train,
  onSelect,
  selected = false,
}) {
  if (
    typeof train.latitude !== "number" ||
    typeof train.longitude !== "number"
  ) {
    return null;
  }

  const handleClick = (event) => {
    /*
     * Prevent the marker click from being interpreted
     * as a map click.
     */
    event.originalEvent?.stopPropagation();

    onSelect(train);
  };

  return (
    <Marker
      position={[
        train.latitude,
        train.longitude,
      ]}
      icon={createTrainIcon(
        train.status,
        selected
      )}
      eventHandlers={{
        click: handleClick,
      }}
    >
      <Popup>
        <div className="min-w-[170px]">
          <p className="text-xs font-semibold text-gray-400">
            {train.number}
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-800">
            {train.name}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {train.location}
          </p>

          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-400">
                Speed
              </span>

              <p className="font-medium text-gray-700">
                {train.speed}
              </p>
            </div>

            <div>
              <span className="text-gray-400">
                ETA
              </span>

              <p className="font-medium text-orange-500">
                {train.eta}
              </p>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}