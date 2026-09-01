import {
  Clock3,
  MapPin,
  Gauge,
  BrainCircuit,
} from "lucide-react";


/*
|--------------------------------------------------------------------------
| Convert "10:42 AM" / "02:30 PM" into minutes
|--------------------------------------------------------------------------
*/

function timeToMinutes(time) {
  if (!time) {
    return null;
  }

  const match = time
    .trim()
    .match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) {
    return null;
  }

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (hours === 12) {
    hours = 0;
  }

  if (period === "PM") {
    hours += 12;
  }

  return hours * 60 + minutes;
}


/*
|--------------------------------------------------------------------------
| Arrival status
|--------------------------------------------------------------------------
*/

function getArrivalStatus(
  arrivalTime,
  estimatedArrivalTime
) {
  const scheduled = timeToMinutes(arrivalTime);
  const estimated = timeToMinutes(
    estimatedArrivalTime
  );

  if (
    scheduled === null ||
    estimated === null
  ) {
    return {
      type: "unknown",
      difference: 0,
      label: "Time unavailable",
    };
  }

  const difference = estimated - scheduled;

  /*
   * Estimated earlier than scheduled
   */
  if (difference < 0) {
    return {
      type: "early",
      difference: Math.abs(difference),
      label: `${Math.abs(difference)} min early`,
    };
  }

  /*
   * Estimated later than scheduled
   */
  if (difference > 0) {
    return {
      type: "delayed",
      difference,
      label: `${difference} min delayed`,
    };
  }

  /*
   * Exactly on time
   */
  return {
    type: "on-time",
    difference: 0,
    label: "On time",
  };
}


/*
|--------------------------------------------------------------------------
| Train Summary
|--------------------------------------------------------------------------
*/

export default function TrainSummary({
  train,
}) {
  const arrivalStatus = getArrivalStatus(
    train.arrivalTime,
    train.estimatedArrivalTime
  );

  const isDelayed =
    arrivalStatus.type === "delayed";

  const isGreen =
    arrivalStatus.type === "early" ||
    arrivalStatus.type === "on-time";


  return (
    <section className="shrink-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

      {/* =================================================
          TOP
      ================================================= */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

        {/* TRAIN INFORMATION */}

        <div className="min-w-0">

          <div className="flex flex-wrap items-center gap-2">

            <span className="rounded-md bg-[#edf0f5] px-2.5 py-1 text-xs font-semibold text-[#253f69]">
              {train.number}
            </span>

            <span
              className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                train.status === "critical"
                  ? "bg-red-50 text-red-600"
                  : train.status === "delayed"
                    ? "bg-orange-50 text-orange-600"
                    : "bg-green-50 text-green-600"
              }`}
            >
              {train.status === "critical"
                ? "Critical Delay"
                : train.status === "delayed"
                  ? "Delayed"
                  : "On Time"}
            </span>

          </div>


          <h1 className="mt-2 text-xl font-semibold text-[#202126] sm:text-2xl">
            {train.name}
          </h1>


          <p className="mt-1 text-sm text-gray-500">
            {train.route}
          </p>

        </div>


        {/* =================================================
            ARRIVAL STATUS
        ================================================= */}

        <div
          className={`w-full rounded-xl border p-4 lg:w-[330px] ${
            isDelayed
              ? "border-red-200 bg-red-50"
              : "border-green-200 bg-green-50"
          }`}
        >

          <div className="flex items-center gap-2">

            <Clock3
              className={`h-4 w-4 ${
                isDelayed
                  ? "text-red-500"
                  : "text-green-600"
              }`}
            />

            <p
              className={`text-xs font-semibold uppercase tracking-wide ${
                isDelayed
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              Arrival Prediction
            </p>

          </div>


          {/* TIMES */}

          <div className="mt-3 grid grid-cols-2 gap-4">

            {/* SCHEDULED */}

            <div>
              <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                Scheduled Arrival
              </p>

              <p className="mt-1 text-lg font-semibold text-gray-800">
                {train.arrivalTime}
              </p>
            </div>


            {/* ESTIMATED */}

            <div>
              <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                Estimated Arrival
              </p>

              <p
                className={`mt-1 text-lg font-semibold ${
                  isDelayed
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {train.estimatedArrivalTime}
              </p>
            </div>

          </div>


          {/* STATUS BOX */}

          <div
            className={`mt-3 rounded-lg px-3 py-2 text-center text-xs font-semibold ${
              isDelayed
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {isDelayed ? "⚠ " : "✓ "}
            {arrivalStatus.label}
          </div>

        </div>

      </div>


      {/* =================================================
          TRAIN METRICS
      ================================================= */}

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4 sm:grid-cols-4">

        {/* LOCATION */}

        <div className="flex items-start gap-2">

          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#253f69]" />

          <div className="min-w-0">

            <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
              Current Location
            </p>

            <p className="mt-1 truncate text-sm font-semibold text-gray-700">
              {train.location}
            </p>

          </div>

        </div>


        {/* SPEED */}

        <div className="flex items-start gap-2">

          <Gauge className="mt-0.5 h-4 w-4 shrink-0 text-[#253f69]" />

          <div>

            <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
              Current Speed
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-700">
              {train.speed} km/h
            </p>

          </div>

        </div>


        {/* NEXT STATION */}

        <div className="flex items-start gap-2">

          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />

          <div className="min-w-0">

            <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
              Next Station
            </p>

            <p className="mt-1 truncate text-sm font-semibold text-gray-700">
              {train.nextStation}
            </p>

          </div>

        </div>


        {/* AI CONFIDENCE */}

        <div className="flex items-start gap-2">

          <BrainCircuit className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />

          <div className="min-w-0 flex-1">

            <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
              AI Confidence
            </p>

            <div className="mt-1 flex items-center gap-2">

              <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-gray-200">

                <div
                  className="h-full rounded-full bg-green-500"
                  style={{
                    width: `${train.confidence}%`,
                  }}
                />

              </div>

              <span className="text-xs font-semibold text-green-600">
                {train.confidence}%
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}