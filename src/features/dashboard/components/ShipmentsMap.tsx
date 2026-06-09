import { Truck } from "lucide-react";

export function ShipmentsMap() {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Shipments On Map</h3>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
            Real-time coordinates and GPS tracking paths
          </p>
        </div>
        <a href="#map" className="text-xs font-bold text-emerald-600 hover:underline">
          View Full Map
        </a>
      </div>

      <div className="relative w-full h-[220px] rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center bg-[#f4f7fa]">
        <svg viewBox="0 0 800 200" className="absolute inset-0 w-full h-full">
          <path d="M 150 150 Q 300 130 400 90 T 650 50" fill="none" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
          <path d="M 150 150 Q 300 130 400 90 T 650 50" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeDasharray="10 5" />

          <circle cx="150" cy="150" r="10" fill="#10b981" opacity="0.15" />
          <circle cx="150" cy="150" r="5" fill="#10b981" />
          <text x="150" y="175" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Kochi</text>

          <circle cx="400" cy="90" r="10" fill="#10b981" opacity="0.15" />
          <circle cx="400" cy="90" r="5" fill="#10b981" />
          <text x="400" y="115" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Thrissur</text>

          <circle cx="650" cy="50" r="10" fill="#ef4444" opacity="0.15" />
          <circle cx="650" cy="50" r="5" fill="#ef4444" />
          <text x="650" y="75" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Calicut</text>
        </svg>

        <div
          className="absolute w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20"
          style={{ top: "110px", left: "260px", animation: "float 2s ease-in-out infinite" }}
        >
          <Truck className="w-4 h-4" />
        </div>
        <div
          className="absolute w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-md shadow-green-500/20"
          style={{ top: "65px", left: "480px", animation: "float 2.5s ease-in-out infinite" }}
        >
          <Truck className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
