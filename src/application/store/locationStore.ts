import { makeAutoObservable, autorun, runInAction } from 'mobx';
import {
  RawLocation,
  RawSector,
  RawAdditionalService,
  RawModule,
  RawBeachAccessory,
  RawService,
  PlacedIcon,
} from '@src/infrastructure/Locations/types';
import { TabItem } from '@src/presentation/ui-kit/Tabs/Tabs';
import { locationsService } from '@src/infrastructure/Locations/locationsService';
import { mapStore } from './mapStore';

export const locationTabs: TabItem<string>[] = [
  {
    value: 'information',
    label: 'Информация',
  },
  {
    value: 'services',
    label: 'Услуги',
  },
  {
    value: 'abonements',
    label: 'Абонементы',
  },
  {
    value: 'reviews',
    label: 'Отзывы',
  },
];

export class LocationStore {
  locationId: number | null = null;
  location: RawLocation | null = null;
  activeTab: 'information' | 'services' | 'abonements' | 'reviews' = 'information';
  isLoading = false;
  isSectorsLoading = false;
  isAdditionalServicesLoading = false;
  isBeachAccessoriesLoading = false;
  mapStore = mapStore;
  sectors: RawSector[] = [];
  additionalServices: RawAdditionalService[] = [];
  beachAccessories: RawBeachAccessory[] = [];
  isModulesLoading = false;
  isServicesLoading = false;
  modules: RawModule[] = [];
  decorate: PlacedIcon[] = [];
  services: RawService[] = [];

  constructor() {
    makeAutoObservable(this);

    autorun(() => {
      if (this.locationId) {
        this.init(this.locationId);
      }
    });

    autorun(() => {
      if (this.mapStore.map && this.location) {
        const [longitude, latitude] = this.location.coordinates;
        this.mapStore.setCenter(longitude, latitude);
      }
    });
  }

  get additionalServicesAsFeatures() {
    return this.additionalServices.map((service) => ({
      name: service.name,
      icon: service.link_icon,
    }));
  }

  get minServicePrice(): RawService['minimal_price'] | null {
    const sorted = this.services
      .slice()
      .filter((s) => s.minimal_price?.price.value !== null)
      .sort((a, b) => a.minimal_price?.price.value! - b.minimal_price?.price.value!);
    return sorted[0]?.minimal_price || null;
  }

  setLocation(locationId: number) {
    this.locationId = locationId;
  }

  clearSelection() {
    this.locationId = null;
    this.sectors = [];
    this.additionalServices = [];
    this.beachAccessories = [];
    this.location = null;
    this.isLoading = false;
    this.isSectorsLoading = false;
    this.isAdditionalServicesLoading = false;
    this.isBeachAccessoriesLoading = false;
    this.isServicesLoading = false;
  }

  init(locationId: number) {
    this.fetchLocation(locationId);
    this.fetchSectors(locationId);
    this.fetchAdditionalServices(locationId);
    this.fetchBeachAccessories(locationId);
    // this.fetchModules(locationId);
    this.fetchDecorate(locationId);
    this.fetchServices(locationId);
  }

  async choosePlace() {
    if (!this.locationId) return;

    try {
      mapStore.drawPlan(this.sectors);

      if (this.location?.rotation) {
        mapStore.setRotation(this.location.rotation);
      }

      if (this.location?.poligon) {
        setTimeout(() => {
          // @ts-ignore
          mapStore.fitBounds(this.location.poligon);
        }, 500);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async fetchLocation(id: number) {
    try {
      this.isLoading = true;
      const location = await locationsService.getLocation(id);
      console.log('location', location);
      runInAction(() => {
        this.location = location;
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  async fetchServices(id: number) {
    try {
      this.isServicesLoading = true;
      const services = await locationsService.getServices(id);
      console.log('services', services);
      runInAction(() => {
        this.services = services;
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.isServicesLoading = false;
    }
  }

  async fetchAdditionalServices(id: number) {
    try {
      this.isAdditionalServicesLoading = true;
      const additionalServices = await locationsService.getAdditionalServices(id);
      console.log('additionalServices', additionalServices);
      runInAction(() => {
        this.additionalServices = additionalServices;
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.isAdditionalServicesLoading = false;
    }
  }

  async fetchBeachAccessories(id: number) {
    try {
      this.isBeachAccessoriesLoading = true;
      const beachAccessories = await locationsService.getBeachAccessories(id);
      console.log('beachAccessories', beachAccessories);
      runInAction(() => {
        this.beachAccessories = beachAccessories;
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.isBeachAccessoriesLoading = false;
    }
  }

  async fetchSectors(id: number) {
    try {
      this.isSectorsLoading = true;
      const sectors = await locationsService.getSectors(id);
      console.log('sectors', sectors);
      runInAction(() => {
        this.sectors = sectors;
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.isSectorsLoading = false;
    }
  }

  async fetchModules(id: number, from_date?: string, to_date?: string) {
    try {
      this.isModulesLoading = true;
      const elements = await locationsService.getModules(id, from_date, to_date);
      const modules = elements.filter(e => e.placed_icon?.is_decorated === false);

      console.log('modules', modules);
      // console.log('decorate', decorate);

      runInAction(() => {
        this.modules = modules;
        // this.decorate = decorate;
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.isModulesLoading = false;
    }
  }

  async fetchDecorate(id: number) {
    try {
      this.isModulesLoading = true;
      const decorate = await locationsService.getDecorate(id);

      console.log('decorate', decorate);

      runInAction(() => {
        this.decorate = decorate;
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.isModulesLoading = false;
    }
  }
}

export const locationStore = new LocationStore();
