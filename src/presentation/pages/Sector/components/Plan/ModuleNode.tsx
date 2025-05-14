import { bookStore } from '@src/application/store/bookStore';
import { RawModule } from '@src/infrastructure/Locations/types';
import cn from 'classnames';
import styles from './ModuleNode.module.css';
import { observer } from 'mobx-react-lite';
import { sectorStore } from '@src/application/store/sectorStore';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@src/routes';
import { profileStore } from '@src/application/store/profileStore';

export const ModuleNode = observer(({ data: { module }}: { data: { module: RawModule } }) => {
  const navigate = useNavigate();
  const { bookModules } = bookStore;
  const { size, sector } = sectorStore;
  const { isCashier } = profileStore;
  const isAvailable = bookStore.isModuleAvailable(module);

  const pixelMeter = size?.width / sector?.map_width_meter;

  const width = Number(module.placed_icon?.width_icon) * pixelMeter;
  const height = Number(module.placed_icon?.height_icon) * pixelMeter;
  const fontSize = height * 0.3;

  // console.log('module', JSON.parse(JSON.stringify(module.bookings)));

  return (
    <div className={cn(styles.module, {
      [styles.available]: isAvailable,
      [styles.booked]: !isAvailable,
    })}>
      {/* <span
        className={cn(styles.moduleId, {
          [styles.available]: isAvailable,
          [styles.booked]: !isAvailable,
        })}
      >
        <span
          style={{
            minWidth: width * 0.8,
            minHeight: `${fontSize}px`,
            fontSize: `${fontSize}px`,
          }}
          onClick={() => {
            if (!isAvailable) return;
            bookStore.toggleModule(module);
          }}
        >
          {module.number}
        </span>
      </span> */}
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
        })}
        style={{ transform: `rotate(${module.placed_icon?.rotation}deg)`}}
      />
    </div>
  );
});
