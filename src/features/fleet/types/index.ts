import { BaseEntity, Coordinates } from "@/shared/types";

export type VehicleType = "truck_semi" | "truck_box" | "van" | "refrigerated";
export type VehicleStatus = "available" | "in_transit" | "maintenance" | "out_of_service";

export interface VehicleTelemetry {
  speed: number;
  fuelLevel: number;
  engineTemp: number;
  odometer: number;
  heading: number;
  lastUpdated: string;
}

export interface Vehicle extends BaseEntity {
  plateNumber: string;
  model: string;
  type: VehicleType;
  capacityPayload: number;
  capacityVolume: number;
  status: VehicleStatus;
  location?: Coordinates;
  telemetry?: VehicleTelemetry;
  nextMaintenanceDate?: string;
}
