interface Sector {
  sectorId: number;
  sectorsCoordsPixel: [number, number][];
}

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
  sectors_coords_pixel: Sector[];
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
  additional_services: RawAdditionalService[];
}

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

export interface RawAdditionalService {
  id: number;
  name: string;
  location_id: number;
  link_icon: string;
  created_at: Date;
  updated_at: Date;
}

export interface RawService {
  id: number;
  name: string;
  sector_id: number;
  sector_scheme_id: number;
  placed_icon_id: number;
  placed_icon_group_id: null;
  created_at: Date;
  updated_at: Date;
  price_per_hour: number | null;
  min_booking_duration: number;
  status: string;
  number: number | null;
  images: string[] | null;
  description: string | null;
  deleted_at: string | null;
  laravel_through_key: number;
  placed_icon: {
    id: number;
    location_id: number;
    sector_scheme_id: number;
    width_icon: string;
    height_icon: string;
    left: string;
    top: string;
    rotation: string;
    zoom: string;
    style: string;
    created_at: Date;
    updated_at: Date;
    price_per_hour: number;
    name_icon: string;
    link_icon: string;
  };
  placed_icon_group: null;
}

export interface RawBeachAccessory {
  id: number;
  name: string;
  location_id: number;
  link_icon: string;
  price: number;
  created_at: Date;
  updated_at: Date;
}

export interface RawSectorSchema {
  id: number;
  sector_id: number;
  name: string;
  is_active: string;
  time_of_day: TimeOfDay;
  created_at: Date;
  updated_at: Date;
  time_start: string;
  time_end: string;
}

export type ModuleStatus = 'available' | 'booked' | 'inactive';

export interface Module {
  id: number;
  name: string;
  sector_id: number;
  sector_scheme_id: number;
  placed_icon_id: number;
  placed_icon_group_id: null;
  created_at: Date;
  updated_at: Date;
  price_per_hour: number | null;
  min_booking_duration: number;
  status: ModuleStatus;
  laravel_through_key: number;
  description: string | null;
  number: string | null;
  images: string[] | null;
  placed_icon: {
    id: number;
    location_id: number;
    sector_scheme_id: number;
    width_icon: string;
    height_icon: string;
    left: string;
    top: string;
    rotation: string;
    zoom: string;
    style: string;
    created_at: Date;
    updated_at: Date;
    price_per_hour: number;
    name_icon: string;
    link_icon: string;
  };
  placed_icon_group: null;
  // "sector_scheme": {
  //     "id": 5,
  //     "sector_id": 3,
  //     "name": "Схема 1",
  //     "is_active": "1",
  //     "time_of_day": "day",
  //     "created_at": "2025-03-14T14:59:32.000000Z",
  //     "updated_at": "2025-03-14T14:59:32.000000Z",
  //     "time_start": "07:00:00",
  //     "time_end": "13:00:00"
  // },
  // "bookings": []
}

export interface Slot {
  start_hour: Date;
  end_hour: Date;
  is_busy: boolean;
}

export interface RawModule {
  module: Module;
  slots: Slot[];
}

export type TimeOfDay = 'evening' | 'day';

export interface FavoriteUpdateResult {
  success: boolean;
  message: string;
}
