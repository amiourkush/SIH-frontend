export default function StatCard({
  title,
  value,
  icon,
  valueColor = "text-[#1d1e23]",
}) {
  return (
    <div className="flex min-h-24 flex-col justify-between rounded-lg border border-[#d9dce4] bg-white p-4 sm:min-h-28">
      
      {/* Top section */}
      <div className="flex items-center justify-between gap-3">

        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          {title}
        </p>

        {icon}

      </div>

      {/* Value */}
      <p
        className={`text-3xl font-bold leading-none sm:text-4xl ${valueColor}`}
      >
        {value}
      </p>

    </div>
  );
}