import { bookStore } from '@src/application/store/bookStore';
import { RawModule } from '@src/infrastructure/Locations/types';
import cn from 'classnames';
import styles from './ModuleNode.module.css';
import { observer } from 'mobx-react-lite';

const baseWidth = 16.14;

export const ModuleNode = observer(({ data: { module }}: { data: { module: RawModule } }) => {
  const { bookModules } = bookStore;
  const [isAvailable, availableSlot] = bookStore.isModuleAvailable(module, false);
  // const isAvailable = true;
  // const availableSlot = null;

  const width = Number(module.placed_icon?.width_icon) * baseWidth;
  const height = Number(module.placed_icon?.height_icon) * baseWidth;
  const fontSize = height * 0.3;

  return (
    <div className={styles.module}>
      <span
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
            bookStore.toggleModule(module, availableSlot);
          }}
        >
          {module.number}
        </span>
      </span>
      <img
        src={module.placed_icon?.link_icon}
        alt={module.placed_icon?.name_icon}
        onClick={() => {
          if (!isAvailable) return;
          bookStore.toggleModule(module, availableSlot)
        }}
        width={width}
        height={height}
        className={cn({
          [styles.activeModule]: bookModules.has(module.id),
        })}
      />
    </div>
  );
});
