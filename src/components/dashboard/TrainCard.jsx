import { useNavigate } from "react-router-dom";

export default function TrainCard({ train, onSelect }) {
  const navigate = useNavigate();

  const isCritical = train.status === "critical";
  const isOnTime = train.status === "on-time";

  const handleClick = () => {
    onSelect(train);
  };

  const handleDoubleClick = () => {
    onSelect(train);
    navigate("/train-details");
  };

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`mb-3 cursor-pointer rounded-lg border bg-white p-3 shadow-sm transition hover:shadow-md sm:p-4 ${
        isCritical ? "border-red-200" : "border-gray-200"
      }`}
    >
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2.5">
          <span className="shrink-0 rounded-md bg-[#edf0f5] px-2 py-1 text-xs font-medium text-gray-600">
            {train.number}
          </span>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-800 sm:text-base">
              {train.name}
            </h3>

            <p className="mt-1 truncate text-xs text-gray-500">
              {train.route}
            </p>
          </div>
        </div>

        {isOnTime ? (
          <span className="shrink-0 rounded-md bg-[#e8f8ef] px-2 py-1 text-xs font-medium text-green-600">
            ✓ On Time
          </span>
        ) : (
          <span
            className={`shrink-0 rounded-md px-2 py-1 text-xs font-medium ${
              isCritical
                ? "bg-[#ffeaea] text-red-500"
                : "bg-[#fff0e8] text-orange-500"
            }`}
          >
            {isCritical ? "⚠ " : ""}
            {train.delay}
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="min-w-0">
          <p className="text-[0.65rem] font-medium uppercase tracking-wide text-gray-400">
            Location
          </p>

          <p className="mt-1 truncate text-sm font-medium text-gray-700">
            {train.location}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-[0.65rem] font-medium uppercase tracking-wide text-gray-400">
            Speed
          </p>

          <p className="mt-1 text-sm font-medium text-gray-700">
            {train.speed}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-[0.65rem] font-medium uppercase tracking-wide text-gray-400">
            Predicted ETA
          </p>

          <p className="mt-1 text-sm font-medium text-orange-500">
            {train.eta}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <p className="text-[0.65rem] font-medium uppercase tracking-wide text-gray-400">
            Next Station
          </p>

          <p className="mt-1 truncate text-sm font-medium text-gray-800">
            {train.nextStation}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-[0.65rem] font-medium uppercase tracking-wide text-gray-400">
            AI Confidence
          </p>

          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-green-500 transition-all"
                style={{ width: `${train.confidence}%` }}
              />
            </div>

            <span className="shrink-0 text-xs font-medium text-green-600">
              {train.confidence}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}