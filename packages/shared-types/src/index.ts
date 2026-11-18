
export interface Stop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  code?: string;
}

export interface Route {
  id: string;
  shortName: string;
  longName: string;
  color?: string;
}

export interface Arrival {
  stopId: string;
  routeId: string;
  destination: string;
  scheduledTime: string;
  estimatedTime?: string;
  source: "scheduled" | "realtime" | "estimated";
}

export interface Vehicle {
  id: string;
  routeId: string;
  latitude: number;
  longitude: number;
  locationType: "gps" | "estimated";
  updatedAt: string;
}
