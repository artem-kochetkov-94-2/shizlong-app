import { useEffect } from 'react';
import { load } from '@2gis/mapgl';
import { observer } from 'mobx-react-lite';
import { mapStore } from '@src/application/store/mapStore';
import styles from './Map.module.css';
import { geoStore } from '@src/application/store/geoStore';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@src/routes';
import { RawLocation, RawSector } from '@src/infrastructure/Locations/types';

const MAP_CONTAINER_ID = 'map';

export const Map = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    load().then((mapglAPI) => {
      const map = new mapglAPI.Map(MAP_CONTAINER_ID, {
        center: [39.712555, 43.587445],
        zoom: 9,
        key: '1235a1dd-c965-44d9-b210-f52fb60b1e89',
        zoomControl: 'centerRight',
        style: 'caf7e397-ebea-4d36-8d7d-0822abf9c817',
      });

      mapStore.setMapInstance(map, mapglAPI);
    });

    return () => {
      mapStore.destroy();
    };
  }, []);

  const onMarkerClick = (location: RawLocation) => {
    navigate(Routes.Location.replace(':id', location.id.toString()));
  };

  const onSectorClick = (sector: RawSector) => {
    navigate(Routes.Sector.replace(':id', sector.id.toString()));
  };

  useEffect(() => {
    mapStore.setMarkerClickCb(onMarkerClick);
  }, [onMarkerClick]);

  useEffect(() => {
    mapStore.setSectorClickCb(onSectorClick);
  }, [onSectorClick]);

  useEffect(() => {
    // 2gis first - latitude
    // 2gis second - longitude
    if (!mapStore.map || !geoStore.location || geoStore.permissionStatus === null) return;

    mapStore.init();
  }, [geoStore.location, mapStore.map, geoStore.permissionStatus]);

  return <div id={MAP_CONTAINER_ID} className={styles.map} />;
});
