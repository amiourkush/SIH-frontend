import { MapPin, CheckCircle2, Circle } from "lucide-react";

function timeToMinutes(time) {
  if (!time) return null;

  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (hours === 12) hours = 0;
  if (period === "PM") hours += 12;

  return hours * 60 + minutes;
}

function getTimeDifference(arrivalTime, estimatedArrivalTime) {
  const arrival = timeToMinutes(arrivalTime);
  const estimated = timeToMinutes(estimatedArrivalTime);

  if (arrival === null || estimated === null) {
    return null;
  }

  return estimated - arrival;
}

export default function RouteTimeline({ train }) {
  return (
    <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="shrink-0 border-b border-gray-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-[#202126]">
          Route Timeline
        </h2>

        <p className="mt-0.5 text-xs text-gray-400">
          Scheduled arrival vs AI predicted ETA
        </p>
      </div>

      {/* Timeline */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="relative">
          {train.stations.map((station, index) => {
            const isCurrent = station.status === "current";
            const isCompleted = station.status === "completed";

            const difference = getTimeDifference(
              station.arrivalTime,
              station.estimatedArrivalTime
            );

            const isDelayed = difference !== null && difference > 0;
            const isEarly = difference !== null && difference < 0;

            return (
              <div
                key={`${station.code}-${index}`}
                className="relative flex gap-3 pb-6 last:pb-0"
              >
                {/* Vertical line */}
                {index !== train.stations.length - 1 && (
                  <div className="absolute left-[9px] top-5 h-full w-px bg-gray-200" />
                )}

                {/* Station icon */}
                <div className="relative z-10 shrink-0">
                  {isCurrent ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#071b3b] ring-4 ring-[#edf2fa]">
                      <MapPin className="h-3 w-3 text-white" />
                    </div>
                  ) : isCompleted ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                  ) : (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                      <Circle className="h-2 w-2 fill-gray-300 text-gray-300" />
                    </div>
                  )}
                </div>

                {/* Station content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3
                        className={`text-sm font-semibold ${
                          isCurrent
                            ? "text-[#071b3b]"
                            : "text-gray-800"
                        }`}
                      >
                        {station.name}
                      </h3>

                      <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-400">
                        {station.code}
                      </p>
                    </div>

                    {isCurrent && (
                      <span className="shrink-0 rounded-full bg-[#edf2fa] px-2 py-1 text-[10px] font-semibold text-[#253f69]">
                        Current
                      </span>
                    )}
                  </div>

                  {/* Arrival + ETA */}
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-2">
                      <p className="text-[9px] font-medium uppercase tracking-wide text-gray-400">
                        Arrival
                      </p>

                      <p className="mt-0.5 text-xs font-semibold text-gray-700">
                        {station.arrivalTime || "--"}
                      </p>
                    </div>

                    <div
                      className={`rounded-md border px-2.5 py-2 ${
                        isDelayed
                          ? "border-red-200 bg-red-50"
                          : "border-green-200 bg-green-50"
                      }`}
                    >
                      <p
                        className={`text-[9px] font-medium uppercase tracking-wide ${
                          isDelayed
                            ? "text-red-500"
                            : "text-green-600"
                        }`}
                      >
                        ETA
                      </p>

                      <p
                        className={`mt-0.5 text-xs font-semibold ${
                          isDelayed
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {station.estimatedArrivalTime || "--"}
                      </p>
                    </div>
                  </div>

                  {/* Difference */}
                  {difference !== null && difference !== 0 && (
                    <p
                      className={`mt-1 text-[10px] font-medium ${
                        isDelayed
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {isDelayed
                        ? `+${difference} min delayed`
                        : `${Math.abs(difference)} min early`}
                    </p>
                  )}

                  {difference === 0 && (
                    <p className="mt-1 text-[10px] font-medium text-green-600">
                      On time
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}