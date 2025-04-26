import { PlacedIcon } from '@src/infrastructure/Locations/types';
import styles from './ModuleNode.module.css';
import { observer } from 'mobx-react-lite';
import { sectorStore } from '@src/application/store/sectorStore';

export const DecorateNode = observer(({ data: { decorate }}: { data: { decorate: PlacedIcon } }) => {
  const { size, sector } = sectorStore;

  const pixelMeter = size?.width / sector?.map_width_meter;

  const width = Number(decorate?.width_icon) * pixelMeter;
  const height = Number(decorate?.height_icon) * pixelMeter;

  return (
    <div className={styles.module} style={{ pointerEvents: 'none' }}>
      <img
        src={decorate?.link_icon}
        alt={decorate?.name_icon}
        width={width}
        height={height}
      />
    </div>
  );
});
