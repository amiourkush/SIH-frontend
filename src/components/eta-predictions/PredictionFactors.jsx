import {
  Clock3,
  Gauge,
  GitBranch,
  TrendingUp,
} from "lucide-react";

const icons = {
  "current-delay": Clock3,
  "route-congestion": GitBranch,
  "historical-pattern": TrendingUp,
  "current-speed": Gauge,
};

function getStyles(type) {
  if (type === "critical") {
    return {
      wrapper: "border-red-200 bg-red-50",
      icon: "bg-red-100 text-red-500",
      value: "text-red-600",
    };
  }

  if (type === "warning") {
    return {
      wrapper: "border-orange-200 bg-orange-50",
      icon: "bg-orange-100 text-orange-600",
      value: "text-orange-600",
    };
  }

  if (type === "positive") {
    return {
      wrapper: "border-blue-200 bg-blue-50",
      icon: "bg-blue-100 text-blue-600",
      value: "text-blue-600",
    };
  }

  return {
    wrapper: "border-gray-200 bg-gray-50",
    icon: "bg-gray-200 text-gray-600",
    value: "text-gray-600",
  };
}

export default function PredictionFactors({ prediction }) {
  return (
    <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="text-sm font-semibold text-[#202126]">
        Prediction Factors
      </h2>

      <div className="mt-4 space-y-2.5">
        {prediction.factors.map((factor) => {
          const Icon = icons[factor.id] || TrendingUp;
          const styles = getStyles(factor.type);

          return (
            <div
              key={factor.id}
              className={`flex items-center justify-between gap-3 rounded-lg border p-2.5 ${styles.wrapper}`}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${styles.icon}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>

                <span className="truncate text-xs font-medium text-gray-600">
                  {factor.name}
                </span>
              </div>

              <span
                className={`shrink-0 text-xs font-semibold ${styles.value}`}
              >
                {factor.value}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="text-xs font-semibold text-gray-700">
          Total Impact
        </span>

        <span className="rounded-md border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-600">
          {prediction.totalImpact.value}
        </span>
      </div>
    </section>
  );
}