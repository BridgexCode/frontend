export function DriversStatusDonut() {
  return (
    <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Drivers Status</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
              Active drivers status distribution
            </p>
          </div>
          <a href="#drivers" className="text-xs font-bold text-emerald-600 hover:underline">
            View All
          </a>
        </div>
      </div>

      <div className="relative flex justify-center items-center my-6 h-36">
        <svg className="w-36 h-36 transform -rotate-90">
          <circle cx="72" cy="72" r="50" fill="transparent" stroke="#f1f5f9" strokeWidth="15" />
          <circle cx="72" cy="72" r="50" fill="transparent" stroke="#22c55e" strokeWidth="15" strokeDasharray="314.15" strokeDashoffset={314.15 * 0.2} strokeLinecap="round" />
          <circle cx="72" cy="72" r="50" fill="transparent" stroke="#f97316" strokeWidth="15" strokeDasharray="314.15" strokeDashoffset={314.15 * 0.8} className="transform rotate-[288deg] origin-[72px_72px]" />
        </svg>
        <div className="absolute text-center">
          <span className="text-[10px] font-bold text-slate-400 block leading-none">Total Drivers</span>
          <span className="text-xl font-extrabold text-slate-800 block mt-1">15</span>
        </div>
      </div>

      <div className="space-y-2 text-xs font-semibold text-slate-500">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span>Active</span>
          </div>
          <span className="text-slate-800 font-bold">12 (80%)</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span>Offline</span>
          </div>
          <span className="text-slate-800 font-bold">3 (20%)</span>
        </div>
      </div>
    </div>
  );
}
