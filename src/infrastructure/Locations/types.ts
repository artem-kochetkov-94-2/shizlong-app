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
