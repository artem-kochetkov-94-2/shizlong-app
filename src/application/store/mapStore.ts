import { makeAutoObservable } from 'mobx';
import markerIcon from '@presentation/components/Map/assets/marker.png';
import clustererIcon from '@presentation/components/Map/assets/clusterer.png';
import markerActiveIcon from '@presentation/components/Map/assets/markerActive.png';
import markerUserIcon from '@presentation/components/Map/assets/markerUser.png';
import { RawLocation, RawSector } from '@src/infrastructure/Locations/types';
import { GeoStore, geoStore } from './geoStore';
import mapTooltip from '@src/assets/mapTooltip.svg';
import mapTooltipFavorite from '@src/assets/mapTooltipFavorite.svg';
import { getPolygonCenter } from '../utils/getPolygonCenter';
import { Clusterer, InputMarker } from '@2gis/mapgl-clusterer';

const labelParams = {
  color: '#ffffff',
  fontSize: 16,
  offset: [0, -40],
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
  clusterer: Clusterer | null = null;
  plan: Map<number, { polygon: any; label: any }> = new Map();
  userMarker: unknown | null = null;

  private geoStore: GeoStore;

  constructor() {
    makeAutoObservable(this);
    this.geoStore = geoStore;
  }

  setMapInstance(map: any, mapglAPI: any) {
    this.mapglAPI = mapglAPI;
    this.map = map;
  }

  init() {
    this.addUserMarker();
  }

  destroy() {
    if (!this.map) return;
    this.map.destroy();
    this.map = null;
    this.locationMarkers.clear();
    this.clusterer?.destroy();
    this.userMarker = null;
    this.plan.clear();
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

  setLocationMarker(location: RawLocation, isFavorite: boolean) {

    const marker = {
      coordinates: location.coordinates,
      icon: markerIcon,
      label: {
        ...(isFavorite ? labelFavoriteParams : labelParams),
        text: location.name,
      },
      userData: {
        location,
      }
    };

    return marker;
  }

  getMarkers(locations: RawLocation[], favoriteLocations: RawLocation[]) {
    const markers = new Map<number, InputMarker>();
    locations.forEach((location) => {
      const isFavorite = favoriteLocations.some((l) => l.id === location.id);
      markers.set(location.id, this.setLocationMarker(location, isFavorite));
    });
    return markers;
  }

  drawMarkers(locations: RawLocation[], favoriteLocations: RawLocation[]) {
    if (!this.map) return;

    if (this.clusterer) {
      this.clusterer.destroy();
    }

    const markers = this.getMarkers(locations, favoriteLocations);
    const clusterer = new Clusterer(this.map, {
      radius: 60,
      clusterStyle: (pointsCount: number) => {
        const labelOffset = pointsCount < 10 ? [-3, -10, 0, 0] : [-3, -10, 0, 0];
        return {
          icon: clustererIcon,
          labelOffset,
          labelFontSize: 18,
        };
      },
    });

    if (markers.size > 0) {
      clusterer.load([...markers.values()]);
    }

    clusterer.on('click', (event) => {
      console.log('event', event.target);
      if (event.target.type === 'marker') {
        this.markerClickCb?.(event.target.data.userData.location);
      }
    });

    this.clusterer = clusterer;
    this.locationMarkers = markers;
  }

  toggleSelectionLocationMarker(id: number, selected: boolean) {
    const newMarkers = new Map(this.locationMarkers);
    const marker = newMarkers.get(id);
    if (!marker) return;

    newMarkers.set(id, {
      ...marker,
      icon: selected ? markerActiveIcon : markerIcon,
    });
    this.clusterer?.load([...newMarkers.values()]);
    this.locationMarkers = newMarkers;
  }

  setMarkerClickCb(cb: (location: RawLocation) => void) {
    this.markerClickCb = cb;
  }

  setSectorClickCb(cb: (sector: RawSector) => void) {
    this.sectorClickCb = cb;
  }

  clearPlan() {
    this.plan.forEach(({ polygon, label }) => {
      // @ts-ignore
      polygon.destroy();
      label.destroy();
    });

    this.plan.clear();
  }

  drawPlan(sectors: RawSector[]) {
    if (!this.map || !this.mapglAPI) return;

    this.clearPlan();

    const plan = new Map();

    sectors.forEach((sector) => {
      const polygon = this.addPolygon(sector.poligon);
      const label = this.addLabel(sector.poligon, sector.name);

      polygon.on('click', () => {
        this.sectorClickCb?.(sector);
      });

      plan.set(sector.id, { polygon, label });
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
