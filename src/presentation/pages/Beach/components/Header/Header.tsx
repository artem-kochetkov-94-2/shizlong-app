import { useNavigate } from 'react-router-dom';
import { IconButton } from '@src/presentation/ui-kit/IconButton';
import { locationsStore } from '@src/application/store/locationsStore';
import { locationStore } from '@src/application/store/locationStore';
import styles from './Header.module.css';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

export const Header = observer(() => {
  const navigate = useNavigate();
  const { location } = locationStore;
  const id = Number(location?.id);
  console.log(id);
  const isFavorite = locationsStore.getFavoriteStatus(id);
  console.log(isFavorite);

  const handleToggleFavorite = (id: number, isFavorite: boolean | null): void => {
    locationsStore.toggleFavoriteLocation(id, !isFavorite);
    console.log('клик');
  };

  return (
    <div className={styles.header}>
      <IconButton
        iconName='arrow-left'
        size='medium'
        onClick={() => navigate(-1)}
        className={styles.backButton}
        shape='rounded'
        color='white'
      />
      <div className={styles.title}>
        <span className={styles.category}>пляж</span>
        <span className={styles.name}>{location?.name}</span>
      </div>
      <div className={cn(styles.icons)}>
        <IconButton
          className={cn({ [styles.favorite]: isFavorite })}
          size='medium'
          iconName='favorite-outline'
          shape='rounded'
          color='white'
          onClick={() => handleToggleFavorite(id, isFavorite)}
          disabled={isFavorite === null}
        />
        <IconButton iconName='route' size='medium' shape='rounded' color='white' />
      </div>
    </div>
  );
});
