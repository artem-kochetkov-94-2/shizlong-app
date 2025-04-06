import { RawLocation } from '@src/infrastructure/Locations/types';
import { locationsService } from '@src/infrastructure/Locations/locationsService';
import { makeAutoObservable } from 'mobx';
import { mapStore } from './mapStore';
import { verificationStore } from './verificationStore';
import { profileStore } from './profileStore';

export class LocationsStore {
  locations: RawLocation[] = [];
  favoriteLocations: RawLocation[] = [];
  isLoading = false;
  isLoadingFavorite = false;
  isLoadingToggle = false;
  mapStore = mapStore;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchfavoriteLocations() {
    try {
      this.isLoadingFavorite = true;
      const locations = await locationsService.getFavoriteLocations();
      this.favoriteLocations = locations;
      console.log(locations);
    } catch (error) {
      this.favoriteLocations = [];
    } finally {
      this.isLoadingFavorite = false;
    }
  }

  setLocations(locations: RawLocation[]) {
    this.locations = locations;
  }

  async init() {
    if (verificationStore.isVerified) {
      await this.fetchLocationsWhithFavorite();
      await this.fetchfavoriteLocations();
      await profileStore.getProfile();
    } else {
      await this.fetchLocations();
    }
  }

  async toggleFavoriteLocation(id: number, add: boolean) {
    try {
      this.isLoadingToggle = true;
      let res;
      if (add) {
        res = await locationsService.addFavoritelocation(id);
      } else {
        res = await locationsService.removeFavoritelocation(id);
      }
      await this.init();
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoadingToggle = false;
    }
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

  async fetchLocationsWhithFavorite() {
    try {
      this.isLoading = true;
      const locations = await locationsService.getLocationWhithFavorite();
      console.log('withFavorite', locations);
      this.setLocations(locations);
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  getFavoriteStatus(id: number) {
    return this.favoriteLocations.some((location) => location.id === id);
  }
}

export const locationsStore = new LocationsStore();
