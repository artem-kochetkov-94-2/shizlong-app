import { makeAutoObservable, runInAction } from 'mobx';
import { RawSector, RawSectorSchema } from '@src/infrastructure/Locations/types';
import { locationsService } from '@src/infrastructure/Locations/locationsService';

export class SectorStore {
  schemes: RawSectorSchema[] = [];
  sector: RawSector | null = null;
  activeScheme: RawSectorSchema | null = null;
  isSchemesLoading = false;
  isSectorLoading = false;
  size: {width: number, height: number} | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  clearSelection() {
    this.sector = null;
    this.schemes = [];
    this.activeScheme = null;
    this.isSchemesLoading = false;
    this.isSectorLoading = false;
  }

  setActiveScheme(scheme: RawSectorSchema) {
    this.activeScheme = scheme;
  }

  async init(sectorId: number) {
    await this.fetchSector(sectorId);
    await this.fetchSchemes(sectorId);

    const dayScheme = this.schemes.find((scheme) => scheme.time_of_day?.name === 'daily');
    this.setActiveScheme(dayScheme || this.schemes[0] || null);
  }

  async fetchSchemes(sectorId: number) {
    try {
      this.isSchemesLoading = true;
      const schemes = await locationsService.getSchemes(sectorId);
      runInAction(() => {
        this.schemes = schemes;
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.isSchemesLoading = false;
    }
  }

  setSize(size: {width: number, height: number}) {
    this.size = size;
  }

  async fetchSector(sectorId: number) {
    try {
      this.isSectorLoading = true;
      const sector = await locationsService.getSector(sectorId);
      runInAction(() => {
        this.sector = sector;
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.isSectorLoading = false;
    }
  }
}

export const sectorStore = new SectorStore();
