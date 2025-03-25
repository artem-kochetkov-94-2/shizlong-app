import { CardItem } from '@presentation/components/CardItem';
import { RawLocation } from '@src/infrastructure/Locations/types';
import styles from './CardList.module.css';

interface CardListProps {
  items: RawLocation[];
  title?: string;
  category?: string;
  isFavorite: boolean;
}

export const CardList = ({ items, title, category, isFavorite }: CardListProps) => {
  return (
    <>
      {title && <p className={styles.title}>{title}</p>}

      <div className={styles.wrapper}>
        {items.map((item) => (
          <CardItem
            key={item.id}
            data={item}
            category={category}
            isFavorite={isFavorite}
          />
        ))}
      </div>
    </>
  );
};
