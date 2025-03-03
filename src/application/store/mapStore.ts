import { makeAutoObservable } from 'mobx';
import markerIcon from '@presentation/components/Map/assets/marker.png';
import { RawLocation, RawSector } from '@src/infrastructure/Locations/types';

class MapStore {
  map: mapgl.Map | null = null;
  mapglAPI: any | null = null;
  center: [number, number] | null = null;
  markerClickCb: ((location: RawLocation) => void) | null = null;
  sectorClickCb: ((sector: RawSector) => void) | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setMapInstance(map: any, mapglAPI: any) {
    this.map = map;
    this.mapglAPI = mapglAPI;
  }

  destroy() {
    if (!this.map) return;
    this.map.destroy();
    this.map = null;
  }

  setCenter(longitude: number, latitude: number) {
    if (!this.map) return;

    this.center = [longitude, latitude];
    this.map.setCenter([longitude, latitude]);
  }

  setZoom(zoom: number) {
    if (!this.map) return;

    this.map.setZoom(zoom);
  }

  setRotation(rotation: number) {
    if (!this.map) return;

    this.map.setRotation(rotation);
  }

  setMarkers(locations: RawLocation[]) {
    if (!this.map) return;

    locations.forEach((location) => {
      const marker = new this.mapglAPI.Marker(this.map, {
        coordinates: location.coordinates,
        icon: markerIcon,
        label: {
          text: location.name,
          color: '#ffffff',
          fontSize: 16,
          haloColor: '#000000',
          haloRadius: 10,
        },
      });

      marker.on('click', () => {
        this.markerClickCb?.(location);
      });
    });
  }

  setMarkerClickCb(cb: (location: RawLocation) => void) {
    this.markerClickCb = cb;
  }

  setSectorClickCb(cb: (sector: RawSector) => void) {
    this.sectorClickCb = cb;
  }

  drawPlan(sectors: RawSector[]) {
    if (!this.map || !this.mapglAPI) return;

    sectors.forEach((sector) => {
      const polygon = this.addPolygon(sector.poligon);
      polygon.on('click', () => {
        this.sectorClickCb?.(sector);
      });
    });
  }

  addPolygon(coordinates: [number, number][]) {
    if (!this.map || !this.mapglAPI) return;

    const polygon = new this.mapglAPI.Polygon(this.map, {
      coordinates: [coordinates],
      color: '#ED9B5880',
      strokeColor: '#ED9B5880',
    });

    return polygon;
  }
}

export const mapStore = new MapStore();
