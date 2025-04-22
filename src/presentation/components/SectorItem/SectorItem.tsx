import { RawSector } from '@src/infrastructure/Locations/types';
import { Tag } from "@presentation/ui-kit/Tag";
import { Icon } from '@presentation/ui-kit/Icon';
import styles from './SectorItem.module.css';
import { Routes } from '@src/routes';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { cashierStore } from '@src/application/store/cashierStore';

interface SectorItemProps {
  data: RawSector;
}

export const SectorItem = observer(({ data }: SectorItemProps) => {
    const { locations } = cashierStore;
    const { id, name, location_id } = data;
    const location = locations.find((location) => location.id === location_id);

    return (
      <Link to={Routes.Sector.replace(':id', `${id}`)}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.category}>
              Пляж {location?.name}
            </div>
            <div className={styles.name}>{name}</div>

            <Tag text={`Занято модулей 5 из 32`} size='small' />
            <div className={styles.tailBookings}>
              <Icon name='time' size='extra-small' />
              <span>Ещё сегодня броней <strong>12</strong></span>
            </div>
          </div>

          <div className={styles.slider}>
            <img src={location?.link_plan as string} />
          </div>
        </div>
      </Link>
    );
  }
);
