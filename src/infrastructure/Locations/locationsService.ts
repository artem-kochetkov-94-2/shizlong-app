import { API_URL_V2 } from '@src/const';
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
import { RestService } from '../restService/restService';
import { VerificationStore, verificationStore } from '@src/application/store/verificationStore';

const routes = {
  locations: '/location/list',
  addFavoritelocation: '/customer/favorites/add',
  removeFavoritelocation: '/customer/favorites/remove',
  location: '/location',
  sectors: '/location/:id/sector/list',
  sector: '/sector',
  additionalServices: '/location/:id/additional-services',
  locationAccessories: '/location/:id/accessories',
  schemes: '/sector/:id/scheme/list',
  getServices: '/location/:id/services',

  cashierSectors: '/cashier/sectors/get',
  cashierLocations: '/cashier/locations/get',
};

class LocationsService {
  private readonly apiUrlV2 = API_URL_V2;
  private restService: RestService;
  private readonly verificationStore: VerificationStore;

  constructor() {
    this.restService = new RestService();
    this.verificationStore = verificationStore;
  }

  async getLocations() {
    if (this.verificationStore.isVerified) {
      const { response } = await this.restService.post<RawLocation[]>({
        url: `${this.apiUrlV2}${routes.locations}`,
      });

      return response;
    }

    const { response } = await this.restService.get<RawLocation[]>({
      url: `${this.apiUrlV2}${routes.locations}`,
    });
    return response;
  }

  async getFavoriteLocations() {
    const { response } = await this.restService.post<RawLocation[]>({
      url: `${this.apiUrlV2}${routes.locations}`,
      data: {
        favorite_only: true,
      }
    });

    return response;
  }

  async addFavoritelocation(id: number) {
    const { response } = await this.restService.post<FavoriteUpdateResult>({
      url: `${this.apiUrlV2}${routes.addFavoritelocation}`,
      data: { location_id: id },
    });
    return response;
  }

  async removeFavoritelocation(id: number) {
    const { response } = await this.restService.delete<FavoriteUpdateResult>({
      url: `${this.apiUrlV2}${routes.removeFavoritelocation}/${id}`,
    });
    return response;
  }

  async getLocation(id: number) {
    const { response } = await this.restService.get<RawLocation>({
      url: `${this.apiUrlV2}${routes.location}/${id}`,
    });
    return response;
  }

  async getSectors(id: number) {
    const { response } = await this.restService.get<RawSector[]>({
      url: `${this.apiUrlV2}${routes.sectors}`.replace(':id', id.toString()),
    });

    return response;
  }

  async getSector(id: number) {
    const { response } = await this.restService.get<RawSector>({
      url: `${this.apiUrlV2}${routes.sector}/${id}`,
    });
    return response;
  }

  async getSchemes(sectorId: number) {
    const { response } = await this.restService.get<RawSectorSchema[]>({
      url: `${this.apiUrlV2}${routes.schemes}`.replace(':id', `${sectorId}`),
    });
    return response;
  }

  async getServices(id: number) {
    const { response } = await this.restService.get<RawService[]>({
      url: `${this.apiUrlV2}${routes.getServices}`.replace(':id', `${id}`),
    });
    return response;
  }

  async getAdditionalServices(id: number) {
    const { response } = await this.restService.get<RawAdditionalService[]>(
      {
        url: `${this.apiUrlV2}${routes.additionalServices}`.replace(':id', `${id}`),
      }
    );
    return response;
  }

  async getBeachAccessories(id: number) {
    const { response } = await this.restService.get<RawBeachAccessory[]>({
      url: `${this.apiUrlV2}${routes.locationAccessories}`.replace(':id', `${id}`),
    });
    return response;
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

  // cashier
  async getCashierSectors() {
    const { response } = await this.restService.get<RawSector[]>({
      url: `${this.apiUrlV2}${routes.cashierSectors}`,
    });
    return response;
  }

  async getCashierLocations() {
    const { response } = await this.restService.get<RawLocation[]>({
      url: `${this.apiUrlV2}${routes.cashierLocations}`,
    });
    return response;
  }
}

export const locationsService = new LocationsService();
