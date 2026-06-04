import { BaseEntity } from "./common";

export type DriverStatus = "active" | "inactive" | "on_trip" | "resting" | "suspended";

export interface Driver extends BaseEntity {
  userId: string;
  name: string;
  phone: string;
  licenseNumber: string;
  licenseClass: string;
  status: DriverStatus;
  rating: number;
  currentVehicleId?: string;
  notes?: string;
}

export interface DriverAssignment extends BaseEntity {
  driverId: string;
  vehicleId: string;
  assignedAt: string;
  releasedAt?: string;
  status: "active" | "completed";
}
