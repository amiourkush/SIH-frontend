import {
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";

import {
  useEffect,
  useRef,
} from "react";

import { useNavigate } from "react-router-dom";

import { useTrains } from "../../hooks/useTrains";

import TrainMarker from "../live-trains/TrainMarker";

const DEFAULT_CENTER = [24.5, 77.5];
const DEFAULT_ZOOM = 6;

const STORAGE_KEY = "dashboard-map-viewport";


/*
|--------------------------------------------------------------------------
| Save viewport safely
|--------------------------------------------------------------------------
*/

function saveMapViewport(map) {
  try {
    /*
     * Make sure the Leaflet map still exists.
     */
    if (!map) {
      return;
    }

    const container = map.getContainer();

    if (!container) {
      return;
    }

    const center = map.getCenter();
    const zoom = map.getZoom();

    if (!center || typeof zoom !== "number") {
      return;
    }

    const viewport = {
      latitude: center.lat,
      longitude: center.lng,
      zoom,
    };

    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(viewport)
    );
  } catch {
    /*
     * The map may already be in the process of
     * being destroyed. Ignore the save.
     */
  }
}


/*
|--------------------------------------------------------------------------
| Get saved viewport
|--------------------------------------------------------------------------
*/

function getSavedMapViewport() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return null;
    }

    const viewport = JSON.parse(saved);

    if (
      typeof viewport.latitude !== "number" ||
      typeof viewport.longitude !== "number" ||
      typeof viewport.zoom !== "number"
    ) {
      return null;
    }

    return viewport;
  } catch {
    return null;
  }
}


/*
|--------------------------------------------------------------------------
| Restore map viewport
|--------------------------------------------------------------------------
*/

function MapInitializer() {
  const map = useMap();

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      return;
    }

    const savedViewport = getSavedMapViewport();

    if (savedViewport) {
      map.setView(
        [
          savedViewport.latitude,
          savedViewport.longitude,
        ],
        savedViewport.zoom,
        {
          animate: false,
        }
      );
    } else {
      map.setView(
        DEFAULT_CENTER,
        DEFAULT_ZOOM,
        {
          animate: false,
        }
      );
    }

    initialized.current = true;
  }, [map]);

  return null;
}


/*
|--------------------------------------------------------------------------
| Persist map viewport
|--------------------------------------------------------------------------
*/

function MapViewportPersistence() {
  const map = useMap();

  useEffect(() => {
    let isMounted = true;

    const handleMoveEnd = () => {
      if (!isMounted) {
        return;
      }

      saveMapViewport(map);
    };

    map.on("moveend", handleMoveEnd);

    /*
     * Save after the map has actually been created.
     */
    saveMapViewport(map);

    return () => {
      /*
       * IMPORTANT:
       *
       * Do NOT call saveMapViewport() here.
       *
       * Leaflet may already be destroying the map DOM
       * when React runs this cleanup.
       */
      isMounted = false;

      map.off("moveend", handleMoveEnd);
    };
  }, [map]);

  return null;
}


/*
|--------------------------------------------------------------------------
| Move map when selected train changes
|--------------------------------------------------------------------------
*/

function SelectedTrainUpdater({
  selectedTrain,
}) {
  const map = useMap();

  const previousTrainId = useRef(null);

  useEffect(() => {
    if (!selectedTrain) {
      return;
    }

    if (
      typeof selectedTrain.latitude !== "number" ||
      typeof selectedTrain.longitude !== "number"
    ) {
      return;
    }

    /*
     * First selected train:
     *
     * Don't animate.
     */
    if (previousTrainId.current === null) {
      previousTrainId.current = selectedTrain.number;

      return;
    }

    /*
     * A different train was selected.
     *
     * Smoothly move the map.
     */
    if (
      previousTrainId.current !== selectedTrain.number
    ) {
      map.flyTo(
        [
          selectedTrain.latitude,
          selectedTrain.longitude,
        ],
        9,
        {
          duration: 0.8,
          easeLinearity: 0.25,
        }
      );

      previousTrainId.current =
        selectedTrain.number;
    }
  }, [map, selectedTrain]);

  return null;
}


/*
|--------------------------------------------------------------------------
| Dashboard map double-click
|--------------------------------------------------------------------------
*/

function MapInteractions() {
  const map = useMap();
  const navigate = useNavigate();

  useEffect(() => {
    const handleDoubleClick = () => {
      navigate("/live-trains");
    };

    map.on("dblclick", handleDoubleClick);

    return () => {
      map.off("dblclick", handleDoubleClick);
    };
  }, [map, navigate]);

  return null;
}


/*
|--------------------------------------------------------------------------
| Dashboard Map
|--------------------------------------------------------------------------
*/

export default function MapView() {
  const {
    trains,
    selectedTrain,
    selectTrain,
  } = useTrains();

  const navigate = useNavigate();


  /*
   * Single-click train marker:
   *
   * Select train
   * +
   * Open Live Trains
   */
  const handleTrainMarkerClick = (train) => {
    selectTrain(train);

    navigate("/live-trains");
  };


  return (
    <div className="relative min-h-0 min-w-0 overflow-hidden rounded-lg border border-[#d8dbe2] bg-white">
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        minZoom={5}
        maxZoom={16}
        scrollWheelZoom={true}
        zoomControl={true}

        /*
         * IMPORTANT
         *
         * Leaflet's normal double-click zoom would
         * interfere with our "double click -> Live Trains"
         * behavior.
         */
        doubleClickZoom={false}

        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapInitializer />

        <MapViewportPersistence />

        <SelectedTrainUpdater
          selectedTrain={selectedTrain}
        />

        <MapInteractions />

        {trains.map((train) => (
          <TrainMarker
            key={train.number}
            train={train}
            onSelect={handleTrainMarkerClick}
            selected={
              selectedTrain?.number === train.number
            }
          />
        ))}
      </MapContainer>


      {/* -------------------------------------------------
          Selected train overlay
      ------------------------------------------------- */}

      {selectedTrain && (
        <div className="absolute left-3 top-3 z-[1000] w-[min(19rem,calc(100%-1.5rem))] rounded-lg border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                Selected Train
              </p>

              <h3 className="mt-1 truncate text-sm font-semibold text-[#202126]">
                {selectedTrain.number} ·{" "}
                {selectedTrain.name}
              </h3>

              <p className="mt-1 truncate text-xs text-gray-500">
                {selectedTrain.route}
              </p>
            </div>

            <span
              className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold ${
                selectedTrain.status === "critical"
                  ? "bg-red-50 text-red-600"
                  : selectedTrain.status === "delayed"
                    ? "bg-orange-50 text-orange-600"
                    : "bg-green-50 text-green-600"
              }`}
            >
              {selectedTrain.status === "on-time"
                ? "On Time"
                : selectedTrain.delay}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 border-t border-gray-100 pt-3">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-wide text-gray-400">
                Location
              </p>

              <p className="mt-1 truncate text-xs font-medium text-gray-700">
                {selectedTrain.location}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-medium uppercase tracking-wide text-gray-400">
                Speed
              </p>

              <p className="mt-1 text-xs font-medium text-gray-700">
                {selectedTrain.speed}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-medium uppercase tracking-wide text-gray-400">
                Next Station
              </p>

              <p className="mt-1 truncate text-xs font-medium text-gray-700">
                {selectedTrain.nextStation}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-medium uppercase tracking-wide text-gray-400">
                ETA
              </p>

              <p className="mt-1 text-xs font-medium text-orange-500">
                {selectedTrain.eta}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}