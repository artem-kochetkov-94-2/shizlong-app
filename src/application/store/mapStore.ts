import { makeAutoObservable } from 'mobx';
import markerIcon from '@presentation/components/Map/assets/marker.png';
import markerActiveIcon from '@presentation/components/Map/assets/markerActive.png';
import markerUserIcon from '@presentation/components/Map/assets/markerUser.png';
import { RawLocation, RawSector } from '@src/infrastructure/Locations/types';
import { GeoStore, geoStore } from './geoStore';
import mapTooltip from '@src/assets/mapTooltip.svg';
import mapTooltipFavorite from '@src/assets/mapTooltipFavorite.svg';
import { getPolygonCenter } from '../utils/getPolygonCenter';

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
  },
};

const labelFavoriteParams = {
  ...labelParams,
  color: '#161D25',
  image: {
    ...labelParams.image,
    url: mapTooltipFavorite,
    padding: [7, 15, 7, 15],
  },
};

class MapStore {
  // @ts-ignore
  map: mapgl.Map | null = null;
  mapglAPI: any | null = null;
  center: [number, number] | null = null;
  markerClickCb: ((location: RawLocation) => void) | null = null;
  sectorClickCb: ((sector: RawSector) => void) | null = null;
  locationMarkers: Map<number, any> = new Map();
  plan: Map<number, unknown> = new Map();
  userMarker: unknown | null = null;
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

    if (!this.userMarker) {
      this.userMarker = new this.mapglAPI.Marker(this.map, {
        coordinates: [this.geoStore.location.longitude, this.geoStore.location.latitude],
        icon: markerUserIcon,
        label: {
          ...labelParams,
          text: 'Я здесь',
        },
      });
    } else {
      // @ts-ignore
      this.userMarker.setCoordinates([
        this.geoStore.location.longitude,
        this.geoStore.location.latitude,
      ]);
    }
  }

  setLocationMarker(location: RawLocation) {
    const existingMarker = this.locationMarkers.get(location.id);

    if (existingMarker) {
      existingMarker.setLabel({
        ...(location.favorite ? labelFavoriteParams : labelParams),
        text: location.name,
      });

      return existingMarker;
    }

    const marker = new this.mapglAPI.Marker(this.map, {
      coordinates: location.coordinates,
      icon: markerIcon,
      label: {
        ...(location.favorite ? labelFavoriteParams : labelParams),
        text: location.name,
      },
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
    // @ts-ignore
    this.locationMarkers.get(id)?.setIcon({
      icon: selected ? markerActiveIcon : markerIcon,
    });
  }

  setMarkerClickCb(cb: (location: RawLocation) => void) {
    this.markerClickCb = cb;
  }

  setSectorClickCb(cb: (sector: RawSector) => void) {
    this.sectorClickCb = cb;
  }

  clearPlan() {
    this.plan.forEach((polygon) => {
      // @ts-ignore
      polygon.destroy();
    });

    this.plan.clear();
  }

  drawPlan(sectors: RawSector[]) {
    if (!this.map || !this.mapglAPI) return;

    this.clearPlan();

    const plan = new Map();

    sectors.forEach((sector) => {
      const polygon = this.addPolygon(sector.poligon);
      const circle = this.addLabel(sector.poligon, sector.name);

      polygon.on('click', () => {
        this.sectorClickCb?.(sector);
      });

      plan.set(sector.id, { polygon, circle });
    });

    this.plan = plan;
  }

  fitBounds(polygon: [number, number][]) {
    if (!this.map || !this.mapglAPI) return;

    // this.addPolygon(polygon);

    let northEast = polygon[0];
    let southWest = polygon[0];

    polygon.forEach(([longitude, latitude]) => {
      if (
        latitude > northEast[1] ||
        (latitude === northEast[1] && longitude > northEast[0])
      ) {
        northEast = [longitude, latitude];
      }
      if (
        latitude < southWest[1] ||
        (latitude === southWest[1] && longitude < southWest[0])
      ) {
        southWest = [longitude, latitude];
      }
    });

    this.map.fitBounds(
      {
        northEast: northEast,
        southWest: southWest,
      },
      {
        considerRotation: true,
        padding: {
          left: 10,
          bottom: 400,
          right: 10,
        },
      }
    );
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

  addLabel(polygon: [number, number][], text: string) {
    if (!this.map || !this.mapglAPI) return;

    const center = getPolygonCenter(polygon);

    const label = new this.mapglAPI.Label(this.map, {
      coordinates: center,
      text: text,
      color: '#161D25CC',
      fontSize: 14,
    });

    return label;
  }
}

export const mapStore = new MapStore();
