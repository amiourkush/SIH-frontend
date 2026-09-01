import { useMemo } from "react";

import { useTrains } from "../hooks/useTrains";
import { getETAPrediction } from "../data/etaPredictions";

import PredictionHeader from "../components/eta-predictions/PredictionHeader";
import PredictionOverview from "../components/eta-predictions/PredictionOverview";
import PredictionFactors from "../components/eta-predictions/PredictionFactors";
import ETATrajectory from "../components/eta-predictions/ETATrajectory";

export default function ETAPredictions() {
  const { trains, selectedTrain } = useTrains();

  const train = useMemo(() => {
    return selectedTrain || trains[0] || null;
  }, [selectedTrain, trains]);

  const prediction = useMemo(() => {
    if (!train) return null;

    return getETAPrediction(train.number);
  }, [train]);

  if (!train || !prediction) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center bg-[#f8f8fa] p-4 sm:p-6">
        <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-lg font-semibold text-[#202126]">
            ETA Prediction Unavailable
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Prediction data is not available for the selected train.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto bg-[#f8f8fa] p-4 sm:p-5 lg:p-6">
      <PredictionHeader
        train={train}
        prediction={prediction}
      />

      <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(260px,0.42fr)]">
        <PredictionOverview
          train={train}
          prediction={prediction}
        />

        <PredictionFactors
          train={train}
          prediction={prediction}
        />
      </div>

      <div className="mt-4">
        <ETATrajectory
          train={train}
          prediction={prediction}
        />
      </div>
    </div>
  );
}