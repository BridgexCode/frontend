"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Package, FileText, Truck } from "lucide-react";
import { fetchShipmentByIdApi, mapStatus } from "@/features/manager/services/shipments-api";
import { fetchDriversApi } from "@/features/manager/services/drivers-api";
import { fetchVehiclesApi } from "@/features/manager/services/vehicles-api";

const STATUS_BADGE: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Dispatched: "bg-blue-100 text-blue-700",
  "Picked Up": "bg-purple-100 text-purple-700",
  "In Transit": "bg-indigo-100 text-indigo-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Delayed: "bg-orange-100 text-orange-700",
  Failed: "bg-red-100 text-red-700",
};

export default function ShipmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [shipment, setShipment] = useState<any>(null);
  const [driver, setDriver] = useState<any>(null);
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    fetchShipmentByIdApi(id)
      .then((data) => {
        if (mounted) setShipment(data);
        if (mounted) {
          Promise.all([
            data.assignedDriverId ? fetchDriversApi() : Promise.resolve([]),
            data.assignedVehicleId ? fetchVehiclesApi() : Promise.resolve([]),
          ]).then(([allDrivers, allVehicles]) => {
            if (!mounted) return;
            if (data.assignedDriverId) {
              const found = allDrivers.find((d: any) => d._id === data.assignedDriverId);
              setDriver(found || null);
            }
            if (data.assignedVehicleId) {
              const found = allVehicles.find((v: any) => v._id === data.assignedVehicleId);
              setVehicle(found || null);
            }
          }).catch(() => {});
        }
      })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 text-sm">Shipment not found</p>
        <button onClick={() => router.push("/manager/shipments")} className="mt-4 text-emerald-600 text-sm font-bold hover:underline cursor-pointer">
          Back to shipments
        </button>
      </div>
    );
  }

  const uiStatus = mapStatus(shipment.statusLifecycle);

  return (
    <div className="space-y-6">
      <button onClick={() => router.push("/manager/shipments")} className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
        <ArrowLeft className="w-4 h-4" />
        Back to shipments
      </button>

      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Package className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{shipment.shipmentId}</h1>
              <p className="text-sm text-slate-400">{shipment.customerName}</p>
            </div>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${STATUS_BADGE[uiStatus] || "bg-slate-100 text-slate-500"}`}>
            {uiStatus}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pickup Location</p>
              <p className="text-sm font-semibold text-slate-800 mt-1">{shipment.pickupLocation}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expected Delivery</p>
              <p className="text-sm font-semibold text-slate-800 mt-1">{new Date(shipment.expectedDeliveryDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <FileText className="w-3 h-3" /> Notes
              </p>
              <p className="text-sm font-semibold text-slate-800 mt-1">{shipment.notes || "No notes"}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Destination</p>
              <p className="text-sm font-semibold text-slate-800 mt-1">{shipment.destination}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Driver</p>
              <p className="text-sm font-semibold text-slate-800 mt-1">{driver ? driver.name : shipment.assignedDriverId || "Not assigned"}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Truck className="w-3 h-3" /> Vehicle
              </p>
              <p className="text-sm font-semibold text-slate-800 mt-1">
                {vehicle ? `${vehicle.vehicleNumber} (${vehicle.vehicleModel})` : driver?.vehicleNumber || "No vehicle assigned"}
              </p>
            </div>
          </div>
        </div>

        {shipment.timeline && shipment.timeline.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Timeline</h3>
            <div className="space-y-3">
              {shipment.timeline.map((event: any, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{event.description}</p>
                    <p className="text-[10px] text-slate-400">{event.timestamp ? new Date(event.timestamp).toLocaleString() : ""}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
