import { bookStore } from '@src/application/store/bookStore';
import { RawModule } from '@src/infrastructure/Locations/types';
import cn from 'classnames';
import styles from './ModuleNode.module.css';
import { observer } from 'mobx-react-lite';
import { sectorStore } from '@src/application/store/sectorStore';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@src/routes';
import { profileStore } from '@src/application/store/profileStore';
import clustererIcon from './clusterer.png';

export const ModuleNode = observer(({ data: { module, hasMarker }}: { data: { module: RawModule, hasMarker: boolean } }) => {
  const navigate = useNavigate();
  const { bookModules } = bookStore;
  const { size, sector } = sectorStore;
  const { isCashier } = profileStore;
  const isAvailable = bookStore.isModuleAvailable(module);

  const pixelMeter = size?.width / sector?.map_width_meter;

  const width = Number(module.placed_icon?.width_icon) * pixelMeter;
  const height = Number(module.placed_icon?.height_icon) * pixelMeter;

  const markerWidth = width * 2;

  console.log('hasMarker', hasMarker);

  return (
    <div className={cn(styles.module)}>
      <img
        src={module.placed_icon?.link_icon}
        alt={module.placed_icon?.name_icon}
        onClick={() => {
          if (!isAvailable) {
            if (isCashier) {
              navigate(Routes.Sector.replace(':id', (sector?.id.toString() ?? '')) + `?module=${module?.id}`);
            }

            return;
          };
          bookStore.toggleModule(module)
        }}
        width={width}
        height={height}
        className={cn({
          [styles.activeModule]: bookModules.has(module.id),
          [styles.available]: isAvailable,
          [styles.booked]: !isAvailable,
          [styles.withMarker]: isCashier && hasMarker,
        })}
        style={{ transform: `rotate(${module.placed_icon?.rotation}deg)` }}
      />

      {isCashier && hasMarker && (
        <div className={styles.marker}>
          <div className={styles.markerHint}>Бронь</div>
          <img
            src={clustererIcon}
            width={markerWidth}
            style={{
              // transform: `rotate(${module.placed_icon?.rotation}deg) translateX(-${offsetX}px)`,
            }}
          />
        </div>
      )}
    </div>
  );
});
