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

export interface RawModule {
    id: number;
    name: string;
    sector_id: number;
    sector_scheme_id: number;
    placed_icon_id: number;
    placed_icon_group_id: null;
    created_at: Date;
    updated_at: Date;
    price_per_hour: number;
    min_booking_duration: number;
    status: ModuleStatus;
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
    },
    placed_icon_group: null;
}

export type TimeOfDay = 'evening' | 'day';
