import { RefreshCw } from "lucide-react";

export default function PredictionHeader({ train, prediction }) {
  return (
    <header className="mb-4 flex shrink-0 flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em]">
          <span className="text-gray-400">
            Train {train.number}
          </span>

          <span className="text-gray-300">/</span>

          <span className="text-gray-400">
            {train.name}
          </span>

          <span className="text-gray-300">/</span>

          <span className="text-[#253f69]">
            AI Engine Active
          </span>
        </div>

        <h1 className="mt-1 text-xl font-semibold tracking-tight text-[#202126] sm:text-2xl">
          Dynamic ETA Prediction
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[10px] text-gray-500 shadow-sm">
        <RefreshCw className="h-3 w-3" />

        <span className="hidden sm:inline">
          Updated
        </span>

        <span className="font-medium text-gray-700">
          {prediction.updatedAt}
        </span>
      </div>
    </header>
  );
}