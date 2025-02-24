import { makeAutoObservable } from 'mobx';

class MapStore {
  // @todo any
  map: any | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setMapInstance(map: any) {
    this.map = map;
  }

  destroy() {
    if (!this.map) return;
    this.map.destroy();
    this.map = null;
  }

  setCenter(latitude: number, longitude: number) {
    if (!this.map) return;
    this.map.setCenter([latitude, longitude]);
  }
}

export const mapStore = new MapStore();
