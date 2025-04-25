import { RawModule } from '@src/infrastructure/Locations/types';
import styles from './ModuleNode.module.css';
import { observer } from 'mobx-react-lite';
import { sectorStore } from '@src/application/store/sectorStore';

export const DecorateNode = observer(({ data: { module }}: { data: { module: RawModule } }) => {
  const { size, sector } = sectorStore;

  const pixelMeter = size?.width / sector?.map_width_meter;

  const width = Number(module.placed_icon?.width_icon) * pixelMeter;
  const height = Number(module.placed_icon?.height_icon) * pixelMeter;

  return (
    <div className={styles.module} style={{ pointerEvents: 'none' }}>
      <img
        src={module.placed_icon?.link_icon}
        alt={module.placed_icon?.name_icon}
        width={width}
        height={height}
      />
    </div>
  );
});
