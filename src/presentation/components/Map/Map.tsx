import styles from './Map.module.css';
import map from './assets/map.jpg';

export const Map = () => {
  return <div className={styles.map} style={{ backgroundImage: `url(${map})` }} />;
};

