import { RawLocation } from '@src/infrastructure/Locations/types';
import { locationsService } from '@src/infrastructure/Locations/locationsService';
import { makeAutoObservable } from 'mobx';
import { mapStore } from './mapStore';

class LocationsStore {
  locations: RawLocation[] = [];
  isLoading = false;
  mapStore = mapStore;

  constructor() {
    makeAutoObservable(this);
  }

  get favoriteLocations() {
    return this.locations.filter((location) => location.isFavorite);
  }

  setLocations(locations: RawLocation[]) {
    this.locations = locations;
  }

  async init() {
    await this.fetchLocations();
    this.mapStore.setMarkers(this.locations);
  }

  async fetchLocations() {
    try {
      this.isLoading = true;
      const locations = await locationsService.getLocations();
      console.log('locations', locations);
      this.setLocations(locations);
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}

export const locationsStore = new LocationsStore();
