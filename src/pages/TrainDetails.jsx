import {
  ArrowLeft,
  MapPin,
  RefreshCw,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import TrainSummary from "../components/train-details/TrainSummary";
import RouteTimeline from "../components/train-details/RouteTimeline";
import TrainDetailsMap from "../components/train-details/TrainDetailsMap";

import { useTrains } from "../hooks/useTrains";


export default function TrainDetails() {

  const navigate = useNavigate();

  const {
    selectedTrain,
  } = useTrains();


  /* =======================================================
     NO TRAIN SELECTED
     ======================================================= */

  if (!selectedTrain) {

    return (
      <div className="flex h-full min-h-0 items-center justify-center bg-[#f8f8fa] p-6">

        <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#edf2fa]">

            <MapPin className="h-6 w-6 text-[#253f69]" />

          </div>


          <h1 className="mt-4 text-lg font-semibold text-[#202126]">
            No Train Selected
          </h1>


          <p className="mt-2 text-sm text-gray-500">
            Select a train from the dashboard or live train tracking page to view its details.
          </p>


          <button
            type="button"
            onClick={() => navigate("/")}
            className="
              mt-5
              inline-flex
              items-center
              gap-2
              rounded-lg
              bg-[#071b3b]
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-[#102b55]
            "
          >
            <ArrowLeft className="h-4 w-4" />

            Back to Dashboard

          </button>

        </div>

      </div>
    );
  }


  /* =======================================================
     MAIN PAGE
     ======================================================= */

  return (
    <div
      className="
        flex
        h-full
        min-h-0
        flex-col
        overflow-auto
        bg-[#f8f8fa]
        p-4
        sm:p-5
        lg:p-6
      "
    >

      {/* ===================================================
          PAGE HEADER
          =================================================== */}

      <header className="mb-4 flex shrink-0 items-center justify-between gap-3">

        <div className="min-w-0">

          <div className="flex items-center gap-2">

            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-400">
              Train
            </span>

            <span className="text-[10px] text-gray-300">
              /
            </span>

            <span className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-[#253f69]">
              {selectedTrain.number}
            </span>

          </div>

        </div>


        {/* Last update */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-2
            rounded-full
            border
            border-gray-200
            bg-white
            px-3
            py-1.5
            text-[10px]
            text-gray-500
            shadow-sm
          "
        >

          <RefreshCw className="h-3 w-3" />

          <span className="hidden sm:inline">
            Last updated
          </span>

          <span className="font-medium text-gray-700">
            Just now
          </span>

        </div>

      </header>


      {/* ===================================================
          TRAIN SUMMARY
          =================================================== */}

      <TrainSummary
        train={selectedTrain}
      />


      {/* ===================================================
          ROUTE + MAP
          =================================================== */}

      <div
        className="
          mt-4
          grid
          min-h-[500px]
          flex-1
          grid-cols-1
          gap-4
          lg:grid-cols-[minmax(260px,0.38fr)_minmax(0,1fr)]
        "
      >

        <RouteTimeline
          train={selectedTrain}
        />


        <TrainDetailsMap
          train={selectedTrain}
        />

      </div>

    </div>
  );
}