export function ShipmentsStatusDonut() {
  return (
    <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-bold text-slate-900">Shipments by Status</h3>
        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
          Current operational statuses distribution
        </p>
      </div>

      <div className="relative flex justify-center items-center my-6 h-36">
        <svg className="w-36 h-36 transform -rotate-90">
          <circle cx="72" cy="72" r="50" fill="transparent" stroke="#f1f5f9" strokeWidth="15" />
          <circle cx="72" cy="72" r="50" fill="transparent" stroke="#22c55e" strokeWidth="15" strokeDasharray="314.15" strokeDashoffset={314.15 * 0.2} strokeLinecap="round" />
          <circle cx="72" cy="72" r="50" fill="transparent" stroke="#10b981" strokeWidth="15" strokeDasharray="314.15" strokeDashoffset={314.15 * 0.87} className="transform rotate-[288deg] origin-[72px_72px]" />
          <circle cx="72" cy="72" r="50" fill="transparent" stroke="#f97316" strokeWidth="15" strokeDasharray="314.15" strokeDashoffset={314.15 * 0.93} className="transform rotate-[335deg] origin-[72px_72px]" />
        </svg>
        <div className="absolute text-center">
          <span className="text-[10px] font-bold text-slate-400 block leading-none">Total</span>
          <span className="text-xl font-extrabold text-slate-800 block mt-1">150</span>
        </div>
      </div>

      <div className="space-y-2 text-xs font-semibold text-slate-500">
        <DonutLegend color="bg-green-500" label="Delivered" value="120 (80%)" />
        <DonutLegend color="bg-emerald-500" label="In Transit" value="20 (13%)" />
        <DonutLegend color="bg-orange-500" label="Delayed" value="10 (7%)" />
      </div>
    </div>
  );
}

function DonutLegend({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
        <span>{label}</span>
      </div>
      <span className="text-slate-800">{value}</span>
    </div>
  );
}
