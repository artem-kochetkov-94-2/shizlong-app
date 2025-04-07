import { API_URL, API_URL_V2 } from '@src/const';
import {
  FavoriteUpdateResult,
  RawAdditionalService,
  RawBeachAccessory,
  RawLocation,
  RawModule,
  RawSector,
  RawSectorSchema,
  RawService,
} from './types';
import { ApiResponse } from '@src/infrastructure/types';
import { RestService } from '../restService/restService';

const routes = {
  locations: '/get-locations',
  locationWithFavorite: '/get-locations-with-favorite ',
  favoritelocations: '/get-favorite-locations',
  addFavoritelocation: '/add-favorite-location',
  removeFavoritelocation: '/remove-favorite-location',
  location: '/get-location',
  sectors: '/get-sectors',
  sector: '/get-sector',
  additionalServices: '/get-additional-services',
  getBeachAccessories: '/get-beach-accessories',
  schemes: '/get-schemes',
  getServices: '/get-services',
};

class LocationsService {
  private readonly apiUrl = API_URL;
  private readonly apiUrlV2 = API_URL_V2;
  private restService: RestService;

  constructor() {
    this.restService = new RestService();
  }

  async getLocations() {
    const { response } = await this.restService.get<ApiResponse<RawLocation[]>>({
      url: `${this.apiUrl}${routes.locations}`,
    });
    return response.data;
  }

  async getFavoriteLocations() {
    const { response } = await this.restService.post<ApiResponse<RawLocation[]>>({
      url: `${this.apiUrl}${routes.favoritelocations}`,
    });

    if (!response.success) {
      return [];
    }

    return response.data;
  }

  async getLocationWhithFavorite() {
    const { response } = await this.restService.post<ApiResponse<RawLocation[]>>({
      url: `${this.apiUrl}${routes.locationWithFavorite}`,
    });
    return response.data;
  }

  async addFavoritelocation(id: number) {
    const { response } = await this.restService.post<FavoriteUpdateResult>({
      url: routes.addFavoritelocation,
      data: { location_id: id },
    });
    return response;
  }

  async removeFavoritelocation(id: number) {
    const { response } = await this.restService.post<FavoriteUpdateResult>({
      url: routes.removeFavoritelocation,
      data: { location_id: id },
    });
    return response;
  }

  async getLocation(id: number) {
    const { response } = await this.restService.post<ApiResponse<RawLocation>>({
      url: `${this.apiUrl}${routes.location}`,
      data: { location_id: id },
    });
    return response.data;
  }

  async getSectors(id: number) {
    const { response } = await this.restService.post<ApiResponse<RawSector[]>>({
      url: `${this.apiUrl}${routes.sectors}`,
      data: { location_id: id },
    });

    return response.data;
  }

  async getSector(id: number) {
    const { response } = await this.restService.post<ApiResponse<RawSector>>({
      url: `${this.apiUrl}${routes.sector}`,
      data: { sector_id: id },
    });
    return response.data;
  }

  async getSchemes(sectorId: number) {
    const { response } = await this.restService.post<ApiResponse<RawSectorSchema[]>>({
      url: `${this.apiUrl}${routes.schemes}`,
      data: { sector_id: sectorId },
    });
    return response.data;
  }

  async getServices(id: number) {
    const { response } = await this.restService.post<ApiResponse<RawService[]>>({
      url: `${this.apiUrl}${routes.getServices}`,
      data: { location_id: id },
    });
    return response.data;
  }

  async getAdditionalServices(id: number) {
    const { response } = await this.restService.post<ApiResponse<RawAdditionalService[]>>(
      {
        url: `${this.apiUrl}${routes.additionalServices}`,
        data: { location_id: id },
      }
    );
    return response.data;
  }

  async getBeachAccessories(id: number) {
    const { response } = await this.restService.post<ApiResponse<RawBeachAccessory[]>>({
      url: `${this.apiUrl}${routes.getBeachAccessories}`,
      data: { location_id: id },
    });
    return response.data;
  }

  async getModules(locationId: number, from_date?: string, to_date?: string) {
    const body = {
      from_date,
      to_date,
    };

    const { response } = await this.restService.post<RawModule[]>({
      url: `${this.apiUrlV2}/location/${locationId}/modules`,
      data: { ...body },
    });

    return response;
  }
}

export const locationsService = new LocationsService();
