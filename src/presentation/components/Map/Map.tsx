import { useEffect } from 'react';
import { load } from '@2gis/mapgl';
import { observer } from 'mobx-react-lite';
import { mapStore } from '@src/application/store/mapStore';
import styles from './Map.module.css';
import { geoStore } from '@src/application/store/geoStore';

const MAP_CONTAINER_ID = 'map';

export const Map = observer(() => {
  useEffect(() => {
    load().then((mapglAPI) => {
      const map = new mapglAPI.Map(MAP_CONTAINER_ID, {
        center: [0, 0],
        zoom: 13,
        key: '1235a1dd-c965-44d9-b210-f52fb60b1e89',
      });

      mapStore.setMapInstance(map);
    });

    return () => {
      mapStore.destroy();
    };
  }, []);

  useEffect(() => {
    mapStore.setCenter(geoStore.location.longitude, geoStore.location.latitude);
  }, [geoStore.location]);

  return <div id={MAP_CONTAINER_ID} className={styles.map} />;
});
