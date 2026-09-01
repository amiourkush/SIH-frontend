export default function ETATrajectory({ prediction }) {
  const scheduled = prediction.trajectory.scheduled;
  const aiPrediction = prediction.trajectory.aiPrediction;

  const allPoints = [...scheduled, ...aiPrediction];

  const maxDelay = Math.max(
    ...allPoints.map((point) => point.delay),
    10
  );

  const width = 1000;
  const height = 260;
  const padding = 20;

  const createPoints = (data) => {
    return data
      .map((point, index) => {
        const x =
          padding +
          (index / Math.max(data.length - 1, 1)) *
            (width - padding * 2);

        const y =
          height -
          padding -
          (point.delay / maxDelay) *
            (height - padding * 2);

        return `${x},${y}`;
      })
      .join(" ");
  };

  const scheduledPoints = createPoints(scheduled);
  const aiPoints = createPoints(aiPrediction);

  return (
    <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-[#202126]">
          ETA Trajectory
        </h2>

        <div className="flex items-center gap-4 text-[10px] text-gray-500">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-gray-300" />
            Scheduled
          </div>

          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#253f69]" />
            AI Prediction
          </div>
        </div>
      </div>

      <div className="mt-4 w-full overflow-hidden rounded-lg bg-[#f8fafc]">
        <svg
          viewBox={`0 0 ${width} 300`}
          preserveAspectRatio="none"
          className="h-56 w-full sm:h-64"
        >
          {/* Grid */}
          {[60, 120, 180, 240].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2={width}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Scheduled trajectory */}
          <polyline
            points={scheduledPoints}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="7"
            strokeDasharray="18 18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* AI trajectory */}
          <polyline
            points={aiPoints}
            fill="none"
            stroke="#253f69"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Current point */}
          <circle
            cx={aiPrediction.length > 0
              ? padding +
                ((aiPrediction.length - 1) /
                  Math.max(aiPrediction.length - 1, 1)) *
                  (width - padding * 2)
              : width - padding}
            cy={height -
              padding -
              ((aiPrediction.at(-1)?.delay || 0) /
                maxDelay) *
                (height - padding * 2)}
            r="7"
            fill="#253f69"
          />

          {/* NOW */}
          <line
            x1="960"
            y1="10"
            x2="960"
            y2="270"
            stroke="#9ca3af"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          <text
            x="960"
            y="20"
            textAnchor="middle"
            fontSize="12"
            fill="#6b7280"
          >
            NOW
          </text>
        </svg>
      </div>

      {/* Dynamic time labels */}
      <div className="mt-2 flex justify-between px-1 text-[9px] text-gray-400">
        {scheduled.map((point, index) => {
          if (
            index === 0 ||
            index === Math.floor(scheduled.length / 2) ||
            index === scheduled.length - 1
          ) {
            return (
              <span key={`${point.time}-${index}`}>
                {point.time}
              </span>
            );
          }

          return <span key={`${point.time}-${index}`} />;
        })}
      </div>
    </section>
  );
}