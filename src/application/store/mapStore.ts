import { makeAutoObservable } from 'mobx';
import markerIcon from '@presentation/components/Map/assets/marker.png';
import markerActiveIcon from '@presentation/components/Map/assets/markerActive.png';
import markerUserIcon from '@presentation/components/Map/assets/markerUser.png';
import { RawLocation, RawSector } from '@src/infrastructure/Locations/types';
import { GeoStore, geoStore } from './geoStore';
import mapTooltip from '@src/assets/mapTooltip.svg';
import mapTooltipFavorite from '@src/assets/mapTooltipFavorite.svg';

const labelParams = {
  color: '#ffffff',
  fontSize: 16,
  image: {
    url: mapTooltip,
    padding: [5, 10, 5, 10],
    stretchX: [
      [10, 20],
      [20, 30],
    ],
    stretchY: [[0, 22]],
  }
};

const labelFavoriteParams = {
  ...labelParams,
  color: '#161D25',
  image: {
    ...labelParams.image,
    url: mapTooltipFavorite,
    padding: [7, 15, 7, 15],
  }
}

class MapStore {
  map: mapgl.Map | null = null;
  mapglAPI: any | null = null;
  center: [number, number] | null = null;
  markerClickCb: ((location: RawLocation) => void) | null = null;
  sectorClickCb: ((sector: RawSector) => void) | null = null;
  locationMarkers: Map<number, unknown> = new Map();
  private geoStore: GeoStore;

  constructor() {
    makeAutoObservable(this);
    this.geoStore = geoStore;
  }

  setMapInstance(map: any, mapglAPI: any) {
    this.map = map;
    this.mapglAPI = mapglAPI;
  }

  init() {
    this.setCenter(geoStore.location.longitude, geoStore.location.latitude);
    this.addUserMarker();
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

  addUserMarker() {
    if (!this.map) return;

    new this.mapglAPI.Marker(this.map, {
      coordinates: [this.geoStore.location.longitude, this.geoStore.location.latitude],
      icon: markerUserIcon,
      label: {
        ...labelParams,
        text: 'Я здесь',
      },
    });
  }

  setLocationMarker(location: RawLocation) {
    const marker = new this.mapglAPI.Marker(this.map, {
      coordinates: location.coordinates,
      icon: markerIcon,
      label: {
        ...labelParams,
        text: location.name,
      }
    });

    marker.on('click', () => {
      this.markerClickCb?.(location);
    });

    return marker;
  }

  setMarkers(locations: RawLocation[]) {
    if (!this.map) return;

    const markers = new Map();
    
    locations.forEach((location) => {
      markers.set(location.id, this.setLocationMarker(location));
    });

    this.locationMarkers = markers;
  }

  toggleSelectionLocationMarker(id: number, selected: boolean) {
    this.locationMarkers.get(id)?.setIcon({
      icon: selected ? markerActiveIcon : markerIcon
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
