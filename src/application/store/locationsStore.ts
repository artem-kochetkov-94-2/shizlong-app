import { RawLocation } from '@src/infrastructure/Locations/types';
import { locationsService } from '@src/infrastructure/Locations/locationsService';
import { makeAutoObservable, runInAction } from 'mobx';
import { mapStore } from './mapStore';
import { verificationStore } from './verificationStore';
import { profileStore, ProfileStore } from './profileStore';

export class LocationsStore {
  locations: RawLocation[] = [];
  favoriteLocations: RawLocation[] = [];
  isLoading = false;
  isLoadingFavorite = false;
  isLoadingToggle = false;
  mapStore = mapStore;
  search = '';

  profileStore: ProfileStore

  constructor() {
    makeAutoObservable(this);
    this.profileStore = profileStore;
  }

  get filteredLocations() {
    return this.locations.filter(l => l.name.includes(this.search));
  }

  async fetchfavoriteLocations() {
    try {
      this.isLoadingFavorite = true;
      const locations = await locationsService.getFavoriteLocations();
      runInAction(() => {
        this.favoriteLocations = locations;
      });
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
    await this.fetchLocations();
    if (verificationStore.isVerified && !this.profileStore.isCashier) {
      await this.fetchfavoriteLocations();
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

  setSearch(value: string) {
    this.search = value;
  }

  getFavoriteStatus(id: number) {
    return this.favoriteLocations.some((location) => location.id === id);
  }
}

export const locationsStore = new LocationsStore();
