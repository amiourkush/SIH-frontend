import {
  X,
  Gauge,
  Clock3,
  MapPin,
  Brain,
  Navigation,
} from "lucide-react";


export default function LiveTrainOverlay({
  train,
  onClose,
}) {

  if (!train) {
    return null;
  }


  const statusColor =
    train.status === "critical"
      ? "text-red-600"
      : train.status === "delayed"
        ? "text-orange-500"
        : "text-green-600";


  return (
    <section
      className="
        absolute
        left-3
        top-3
        z-[1000]
        w-[calc(100%-1.5rem)]
        max-w-[360px]
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-white
        shadow-xl
        sm:left-5
        sm:top-5
      "
    >

      {/* =================================================
          HEADER
          ================================================= */}

      <div className="bg-[#071b3b] px-4 py-3 text-white">

        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <span className="shrink-0 rounded bg-white/10 px-2 py-1 text-[10px] font-medium">
                {train.number}
              </span>

              <h2 className="truncate text-sm font-semibold sm:text-base">
                {train.name}
              </h2>

            </div>

            <p className="mt-1 text-[10px] text-slate-300">
              {train.route}
            </p>

          </div>


          <button
            type="button"
            onClick={onClose}
            aria-label="Close train details"
            className="shrink-0 rounded-md p-1 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

        </div>

      </div>


      {/* =================================================
          CONTENT
          ================================================= */}

      <div className="max-h-[calc(100vh-9rem)] overflow-y-auto p-3 sm:p-4">

        {/* Speed / Status */}

        <div className="grid grid-cols-2 gap-2">

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">

            <div className="flex items-center gap-1.5 text-gray-500">

              <Gauge className="h-3.5 w-3.5" />

              <span className="text-[10px] font-medium uppercase tracking-wide">
                Speed
              </span>

            </div>

            <p className="mt-1 text-sm font-semibold text-gray-800">
              {train.speed} km/h
            </p>

          </div>


          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">

            <div className="flex items-center gap-1.5 text-gray-500">

              <Clock3 className="h-3.5 w-3.5" />

              <span className="text-[10px] font-medium uppercase tracking-wide">
                Status
              </span>

            </div>

            <p
              className={`mt-1 text-sm font-semibold ${statusColor}`}
            >
              {train.delay}
            </p>

          </div>

        </div>


        {/* Current location */}

        <div className="mt-2 rounded-lg bg-[#f4f7fc] p-3">

          <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
            Current Location
          </p>

          <div className="mt-1 flex items-center gap-2">

            <Navigation className="h-3.5 w-3.5 text-[#071b3b]" />

            <p className="text-sm font-semibold text-gray-800">
              {train.location}
            </p>

          </div>

        </div>


        {/* Next station */}

        <div className="mt-2 rounded-lg bg-[#f4f7fc] p-3">

          <div className="flex items-center justify-between gap-3">

            <div className="min-w-0">

              <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                Next Station
              </p>

              <div className="mt-1 flex items-center gap-1.5">

                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#071b3b]" />

                <p className="truncate text-sm font-semibold text-gray-800">
                  {train.nextStation}
                </p>

              </div>

            </div>


            <div className="shrink-0 text-right">

              <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                Predicted ETA
              </p>

              <p className="mt-1 text-sm font-semibold text-[#071b3b]">
                {train.eta}
              </p>

            </div>

          </div>

        </div>


        {/* AI confidence */}

        <div className="mt-3">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-1.5">

              <Brain className="h-3.5 w-3.5 text-[#253f69]" />

              <span className="text-[10px] font-medium text-gray-500">
                AI Confidence
              </span>

            </div>

            <span className="text-xs font-semibold text-green-600">
              {train.confidence}%
            </span>

          </div>


          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{
                width: `${train.confidence}%`,
              }}
            />

          </div>

        </div>


        {/* Full details */}

        <button
          type="button"
          className="
            mt-3
            w-full
            rounded-md
            border
            border-[#071b3b]
            px-3
            py-2
            text-xs
            font-medium
            text-[#071b3b]
            transition
            hover:bg-[#071b3b]
            hover:text-white
          "
        >
          View Full Details
        </button>

      </div>

    </section>
  );
}