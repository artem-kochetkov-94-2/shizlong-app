import { makeAutoObservable } from 'mobx';
import { RawSector, RawSectorSchema } from '@src/infrastructure/Locations/types';
import { locationsService } from '@src/infrastructure/Locations/locationsService';

class SectorStore {
  schemes: RawSectorSchema[] = [];
  sector: RawSector | null = null;
  activeScheme: RawSectorSchema | null = null;
  isSchemesLoading = false;
  isSectorLoading = false;

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
    this.setActiveScheme(this.schemes[0] || null);
  }

  async fetchSchemes(sectorId: number) {
    try {
      this.isSchemesLoading = true;
      const schemes = await locationsService.getSchemes(sectorId);
      this.schemes = schemes;
    } catch (error) {
      console.error(error);
    } finally {
      this.isSchemesLoading = false;
    }
  }

  async fetchSector(sectorId: number) {
    try {
      this.isSectorLoading = true;
      const sector = await locationsService.getSector(sectorId);
      this.sector = sector;
    } catch (error) {
      console.error(error);
    } finally {
      this.isSectorLoading = false;
    }
  }
}

export const sectorStore = new SectorStore();
