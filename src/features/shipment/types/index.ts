import { BaseEntity, Coordinates } from "@/shared/types";

export type ShipmentStatus =
  | "pending"
  | "assigned"
  | "in_transit"
  | "delivered"
  | "cancelled";

export interface ShipmentTimelineEvent {
  id: string;
  timestamp: string;
  status: ShipmentStatus;
  locationName: string;
  coordinates?: Coordinates;
  description: string;
  updatedBy: "whatsapp_ai" | "system" | "admin";
  notes?: string;
}

export interface Shipment extends BaseEntity {
  shipmentNumber: string;
  originName: string;
  originCoordinates: Coordinates;
  destinationName: string;
  destinationCoordinates: Coordinates;
  status: ShipmentStatus;
  driverId?: string;
  vehicleId?: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  weight: number;
  volume: number;
  timeline: ShipmentTimelineEvent[];
  whatsAppSync: {
    lastSyncedAt: string;
    lastMessageText?: string;
    success: boolean;
  };
}
