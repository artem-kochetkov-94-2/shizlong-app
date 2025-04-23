export interface RawLocation {
  id: number;
  name: string;
  owner_id: number;
  employee_id: number;
  description: null;
  coordinates: [number, number];
  poligon: null | [number, number][];
  map_width_meter: null;
  favorite?: boolean;
  space_coords_pixel: [number, number][];
  sectors_coords_pixel: unknown[];
  zoom: string;
  rotation: null;
  region: null;
  city: string;
  district: null;
  address: string;
  season: null;
  working_hours: null;
  status: boolean;
  link_space: string;
  link_plan: {} | string;
  capacity: null;
  services: null;
  created_at: Date;
  updated_at: Date;
  additional_service: RawAdditionalService[];
}

export interface RawAdditionalService {
  id: number;
  name: string;
  location_id: number;
  link_icon: string;
  created_at: Date;
  updated_at: Date;
}

interface Price {
  value: number;
  formatted_value: string;
}

interface PlacedIcon {
  id: number;
  width_icon: string;
  height_icon: string;
  left: string;
  top: string;
  rotation: string;
  zoom: string;
  style: string;
  name_icon: string;
  link_icon: string;
}

export interface RawService {
  id: number;
  name: string;
  images: string[];
  description: string | null;
  placed_icon: PlacedIcon;
  minimal_price?: {
    price: Price;
    type: {
      name: string;
      description: string;
    }
  } | null;
  placed_icon_group: null;
}

export interface RawBeachAccessory {
  id: number;
  name: string;
  location_id: number;
  link_icon: string;
  price: Price;
  created_at: Date;
  updated_at: Date;
}

// Sector

export interface RawSector {
  id: number;
  name: string;
  location_id: number;
  rotation: string;
  zoom: string;
  map_width_meter: string;
  created_at: Date;
  updated_at: Date;
  coordinates: [number, number];
  poligon: [number, number][];
  link_plan: string;
  sector_coords_pixel: [number, number][];
}

export type TimeOfDay = {
  name: 'evening' | 'daily';
  description: string;
}

export interface RawSectorSchema {
  id: number;
  sector_id: number;
  name: string;
  is_active: string;
  time_of_day?: TimeOfDay;
  created_at: Date;
  updated_at: Date;
  time_start: string;
  time_end: string;
}

// Module

export type ModuleStatus = 'available' | 'booked' | 'inactive';

export interface Slot {
  from: string;
  to: string;
  is_busy: boolean;
  module_scheme_id: number;
}

export interface ModuleScheme {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
  price: Price;
  type: {
    name: 'period' | 'hourly';
    description: string;
  }
}

export interface RawModule {
  number: string | null;
  name: string;
  available: boolean;
  bookings: unknown[];
  description: string | null;
  id: number;
  images: string[];
  placed_icon: PlacedIcon;
  placed_icon_group: null;
  sector_id: number;
  sector_scheme_id: number;
  slots: Slot[];
  status: {
    name: ModuleStatus;
    description: string;
  }
  module_schemes: ModuleScheme[]
}

export interface FavoriteUpdateResult {
  success: boolean;
  message: string;
}
