import { API_URL, API_URL_V2 } from "@src/const";
import {
    RawAdditionalService,
    RawBeachAccessory,
    RawLocation,
    RawModule,
    RawSector,
    RawSectorSchema,
} from "./types";
import { ApiResponse } from "@src/infrastructure/types";

const routes = {
    locations: '/get-locations',
    location: '/get-location',
    sectors: '/get-sectors',
    sector: '/get-sector',
    additionalServices: '/get-additional-services',
    getBeachAccessories: '/get-beach-accessories',
    schemes: '/get-schemes',
};

class LocationsService {
    private readonly apiUrl = API_URL;
    private readonly apiUrlV2 = API_URL_V2;

    async getLocations() {
        const response = await fetch(`${this.apiUrl}${routes.locations}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result: ApiResponse<RawLocation[]> = await response.json();

        if (!result.success) {
            throw new Error('Fetch error');
        };

        return result.data as RawLocation[];
    }

    async getLocation(id: number) {
        const response = await fetch(`${this.apiUrl}${routes.location}`, {
            method: 'POST',
            body: JSON.stringify({
                location_id: id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result: ApiResponse<RawLocation> = await response.json();

        if (!result.success) {
            throw new Error('Fetch error');
        };

        return result.data as RawLocation;
    }

    async getSectors(id: number) {
        const response = await fetch(`${this.apiUrl}${routes.sectors}`, {
            method: 'POST',
            body: JSON.stringify({
                location_id: id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result: ApiResponse<RawSector[]> = await response.json();

        if (!result.success) {
            throw new Error('Fetch error');
        };

        return result.data as RawSector[];
    }

    async getSector(id: number) {
        const response = await fetch(`${this.apiUrl}${routes.sector}`, {
            method: 'POST',
            body: JSON.stringify({
                sector_id: id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result: ApiResponse<RawSector> = await response.json();

        if (!result.success) {
            throw new Error('Fetch error');
        };

        return result.data as RawSector;
    }

    async getSchemes(sectorId: number) {
        const response = await fetch(`${this.apiUrl}${routes.schemes}`, {
            method: 'POST',
            body: JSON.stringify({
                sector_id: sectorId,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result: ApiResponse<RawSectorSchema[]> = await response.json();

        if (!result.success) {
            throw new Error('Fetch error');
        };

        return result.data as RawSectorSchema[];
    }

    async getAdditionalServices(id: number) {
        const response = await fetch(`${this.apiUrl}${routes.additionalServices}`, {
            method: 'POST',
            body: JSON.stringify({
                location_id: id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result: ApiResponse<RawAdditionalService[]> = await response.json();

        if (!result.success) {
            throw new Error('Fetch error');
        };

        return result.data as RawAdditionalService[];
    }

    async getBeachAccessories(id: number) {
        const response = await fetch(`${this.apiUrl}${routes.getBeachAccessories}`, {
            method: 'POST',
            body: JSON.stringify({
                location_id: id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result: ApiResponse<RawBeachAccessory[]> = await response.json();

        if (!result.success) {
            throw new Error('Fetch error');
        };

        return result.data as RawBeachAccessory[];
    }

    async getModules(locationId: number, from_date?: string, to_date?: string) {
        const body = {
            from_date,
            to_date,
        };

        const response = await fetch(`${this.apiUrlV2}/location/${locationId}/modules`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const result: RawModule[] = await response.json();

        return result;
    }
}

export const locationsService = new LocationsService();
