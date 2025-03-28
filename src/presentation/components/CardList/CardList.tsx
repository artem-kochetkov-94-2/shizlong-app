import { CardItem } from '@presentation/components/CardItem';
import { RawLocation } from '@src/infrastructure/Locations/types';
import styles from './CardList.module.css';

interface CardListProps {
  items: RawLocation[];
  title?: string;
  category?: string;
}

export const CardList = ({ items, title, category }: CardListProps) => {
  return (
    <>
      {title && <p className={styles.title}>{title}</p>}

      <div className={styles.wrapper}>
        {items.map((item) => (
          <CardItem key={item.id} data={item} category={category} />
        ))}
      </div>
    </>
  );
};
