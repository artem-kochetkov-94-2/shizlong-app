import { makeAutoObservable } from 'mobx';

type WorkTime = string[];
type PriceLevel = 'low' | 'high' | null;

class FiltersStore {
  filters = {
    workTime: [] as WorkTime,
    hasRating: false,
    accessible: false,
    priceLevel: null as PriceLevel,
    services: [] as string[],
    beachInfrastructure: [] as string[],
    beachAccessories: [] as string[],
  };

  constructor() {
    makeAutoObservable(this);
  }

  setWorkTime(value: WorkTime) {
    this.filters.workTime = value;
  }

  clearWorkTime() {
    this.filters.workTime = [];
  }

  setHasRating(value: boolean) {
    this.filters.hasRating = value;
  }

  toggleHasRating() {
    this.filters.hasRating = !this.filters.hasRating;
  }

  setAccessible(value: boolean) {
    this.filters.accessible = value;
  }

  toggleAccessible() {
    this.filters.accessible = !this.filters.accessible;
  }

  setPriceLevel(value: PriceLevel) {
    this.filters.priceLevel = value;
  }

  clearPriceLevel() {
    this.filters.priceLevel = null;
  }

  setArrayFilter(
    key: keyof Omit<typeof this.filters, 'hasRating' | 'accessible' | 'priceLevel'>,
    value: string
  ) {
    if (Array.isArray(this.filters[key])) {
      const array = this.filters[key] as string[];
      this.filters[key] = array.includes(value)
        ? array.filter((item) => item !== value)
        : [...array, value];
    }
  }

  clearArrayFilter(
    key: keyof Omit<typeof this.filters, 'hasRating' | 'accessible' | 'priceLevel'>
  ) {
    if (Array.isArray(this.filters[key])) {
      this.filters[key] = [];
    }
  }

  resetFilters() {
    this.filters = {
      workTime: [],
      hasRating: false,
      accessible: false,
      priceLevel: null,
      services: [],
      beachInfrastructure: [],
      beachAccessories: [],
    };
  }
}

export const filterStore = new FiltersStore();
