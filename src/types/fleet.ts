import { BaseEntity, Coordinates } from "./common";

export type VehicleType = "truck_semi" | "truck_box" | "van" | "refrigerated";
export type VehicleStatus = "available" | "in_transit" | "maintenance" | "out_of_service";

export interface VehicleTelemetry {
  speed: number;
  fuelLevel: number; // percentage (0-100)
  engineTemp: number; // in Celsius
  odometer: number;
  heading: number; // angle (0-360)
  lastUpdated: string;
}

export interface Vehicle extends BaseEntity {
  plateNumber: string;
  model: string;
  type: VehicleType;
  capacityPayload: number; // kg
  capacityVolume: number; // cubic meters
  status: VehicleStatus;
  location?: Coordinates;
  telemetry?: VehicleTelemetry;
  nextMaintenanceDate?: string;
}
