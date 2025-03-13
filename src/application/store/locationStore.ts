import { makeAutoObservable, autorun } from 'mobx';
import { RawLocation, RawSector, RawAdditionalService, RawModule, RawBeachAccessory } from '@src/infrastructure/Locations/types';
import { Tab } from '@src/presentation/ui-kit/Tabs/Tabs';
import { locationsService } from '@src/infrastructure/Locations/locationsService';
import { mapStore } from './mapStore';

export const locationTabs: Tab[] = [
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

class LocationStore {
  locationId: number | null = null;
  location: RawLocation | null = null;
  activeTab: 'information' | 'services' | 'abonements' | 'reviews' = 'information';
  isLoading = false;
  isSectorsLoading = false;
  isAdditionalServicesLoading = false;
  isBeachAccessoriesLoading = false;
  isModulesLoading = false;
  mapStore = mapStore;
  sectors: RawSector[] = [];
  additionalServices: RawAdditionalService[] = [];
  beachAccessories: RawBeachAccessory[] = [];
  modules: RawModule[] = [];

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
  }

  init(locationId: number) {
    this.fetchLocation(locationId);
    this.fetchSectors(locationId);
    this.fetchAdditionalServices(locationId);
    this.fetchBeachAccessories(locationId);
    this.fetchModules(locationId);
  }

  async choosePlace() {
    if (!this.locationId) return;
    console.log('choosePlace');

    try {
      mapStore.drawPlan(this.sectors);
      mapStore.setCenter(this.location!.coordinates[0], this.location!.coordinates[1]);
      mapStore.setZoom(18);

      if (this.location?.rotation) {
        mapStore.setRotation(this.location.rotation);
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
      this.location = location;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  async fetchAdditionalServices(id: number) {
    try {
      this.isAdditionalServicesLoading = true;
      const additionalServices = await locationsService.getAdditionalServices(id);
      console.log('additionalServices', additionalServices);
      this.additionalServices = additionalServices;
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
      this.beachAccessories = beachAccessories;
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
      this.sectors = sectors;
    } catch (error) {
      console.error(error);
    } finally {
      this.isSectorsLoading = false;
    }
  }

  async fetchModules(id: number) {
    try {
      this.isModulesLoading = true;
      const modules = await locationsService.getModules(id);
      console.log('modules', modules);
      this.modules = modules;
    } catch (error) {
      console.error(error);
    } finally {
      this.isModulesLoading = false;
    }
  }

  get services() {
    return [
      {
        name: 'Одиночный шезлонг пластиковый',
        icon: 'https://placehold.co/24x24',
        extraTitle: '600 ₽',
        extraDescription: 'за 1 час',
      },
      {
        name: 'Одиночный шезлонг деревянный',
        icon: 'https://placehold.co/24x24',
        extraTitle: '900 ₽',
        extraDescription: 'за 1 час',
      },
      {
        name: '2 шезлонга с зонтиком',
        icon: 'https://placehold.co/24x24',
        extraTitle: '1 800 ₽',
        extraDescription: 'за 3 часа',
      },
      {
        name: 'Качеля',
        icon: 'https://placehold.co/24x24',
        extraTitle: '1 200 ₽',
        extraDescription: 'за 1 час',
      },
      {
        name: 'Ракушка',
        icon: 'https://placehold.co/24x24',
        extraTitle: '9 800 ₽',
        extraDescription: 'за 3 часа',
      },
      {
        name: 'Одиночный шезлонг пластиковый 2',
        icon: 'https://placehold.co/24x24',
        extraTitle: '600 ₽',
        extraDescription: 'за 1 час',
      },
      {
        name: 'Одиночный шезлонг деревянный 2',
        icon: 'https://placehold.co/24x24',
        extraTitle: '900 ₽',
        extraDescription: 'за 1 час',
      },
      {
        name: '2 шезлонга с зонтиком 2',
        icon: 'https://placehold.co/24x24',
        extraTitle: '1 800 ₽',
        extraDescription: 'за 3 часа',
      },
      {
        name: 'Качеля 2',
        icon: 'https://placehold.co/24x24',
        extraTitle: '1 200 ₽',
        extraDescription: 'за 1 час',
      },
      {
        name: 'Ракушка 2',
        icon: 'https://placehold.co/24x24',
        extraTitle: '9 800 ₽',
        extraDescription: 'за 3 часа',
      },
    ];
  }

  get peculiarities() {
    return [
      {
        name: 'Доступно для инвалидов',
        icon: 'https://placehold.co/24x24',
      },
      {
        name: 'Бесплатный wi-fi',
        icon: 'https://placehold.co/24x24',
      },
      {
        name: 'Можно с животными',
        icon: 'https://placehold.co/24x24',
      },
    ];
  }
}

export const locationStore = new LocationStore();
