import {
  BrainCircuit,
  Clock3,
  MapPin,
} from "lucide-react";

function timeToMinutes(time) {
  if (!time) return null;

  const match = time
    .trim()
    .match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) return null;

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

function getDifference(arrivalTime, estimatedArrivalTime) {
  const arrival = timeToMinutes(arrivalTime);
  const estimated = timeToMinutes(estimatedArrivalTime);

  if (arrival === null || estimated === null) {
    return null;
  }

  return estimated - arrival;
}

export default function PredictionOverview({
  train,
  prediction,
}) {
  const {
    scheduledArrival,
    currentEstimate,
    aiPrediction,
  } = prediction.prediction;

  const difference = getDifference(
    scheduledArrival,
    aiPrediction
  );

  const isDelayed = difference !== null && difference > 0;
  const isEarly = difference !== null && difference < 0;

  return (
    <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-[#202126]">
            Predicted Arrival
          </h2>

          <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin className="h-3.5 w-3.5" />

            <span>{train.location}</span>

            <span className="text-gray-300">→</span>

            <span>{train.nextStation}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-[#dce7f7] bg-[#f4f7fc] px-2.5 py-1 text-[10px] font-medium text-[#253f69]">
          <BrainCircuit className="h-3 w-3" />

          {prediction.confidence}% Confidence
        </div>
      </div>

      {/* Main ETA */}
      <div className="flex flex-col items-center justify-center py-8 sm:py-10">
        <div className="text-4xl font-semibold tracking-tight text-[#071b3b] sm:text-5xl lg:text-6xl">
          {aiPrediction}
        </div>

        <div className="mt-3 flex items-center gap-1.5 rounded-full bg-[#f3f3f5] px-3 py-1.5 text-[10px] font-medium text-gray-500">
          <Clock3 className="h-3 w-3" />

          <span>Range</span>

          <span className="text-gray-700">
            {prediction.predictionRange.early}
            {" – "}
            {prediction.predictionRange.late}
          </span>
        </div>
      </div>

      {/* Time comparison */}
      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-center">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-gray-400">
              Scheduled ETA
            </p>

            <p className="mt-1 text-xs font-semibold text-gray-600">
              {scheduledArrival}
            </p>
          </div>

          <div className="sm:border-x sm:border-gray-200 sm:px-4">
            <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-gray-400">
              Current Est.
            </p>

            <p className="mt-1 text-xs font-semibold text-gray-700">
              {currentEstimate}
            </p>
          </div>

          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-[#253f69]">
              AI Predicted
            </p>

            <p className="mt-1 text-xs font-semibold text-[#253f69]">
              {aiPrediction}
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          {difference === null ? (
            <span className="rounded-md bg-gray-100 px-2.5 py-1.5 text-[10px] font-medium text-gray-500">
              Time unavailable
            </span>
          ) : isDelayed ? (
            <span className="rounded-md border border-red-200 bg-red-50 px-2.5 py-1.5 text-[10px] font-semibold text-red-600">
              +{difference} min delayed
            </span>
          ) : isEarly ? (
            <span className="rounded-md border border-green-200 bg-green-50 px-2.5 py-1.5 text-[10px] font-semibold text-green-600">
              {Math.abs(difference)} min early
            </span>
          ) : (
            <span className="rounded-md border border-green-200 bg-green-50 px-2.5 py-1.5 text-[10px] font-semibold text-green-600">
              On time
            </span>
          )}
        </div>
      </div>
    </section>
  );
}