import { SlidersHorizontal } from "lucide-react";

import { useTrains } from "../../hooks/useTrains";
import TrainCard from "./TrainCard";

export default function TrainList() {
  const {
    trains,
    selectTrain,
  } = useTrains();

  return (
    <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-lg border border-[#d8dbe2] bg-[#fafafa]">
      <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
          Live ETA Predictions
        </h2>

        <SlidersHorizontal className="h-4 w-4 text-gray-500 sm:h-5 sm:w-5" />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {trains.length > 0 ? (
          trains.map((train) => (
            <TrainCard
              key={train.number}
              train={train}
              onSelect={selectTrain}
            />
          ))
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No trains found
          </div>
        )}
      </div>
    </div>
  );
}