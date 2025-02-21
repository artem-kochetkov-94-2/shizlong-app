import { CardItem } from "@presentation/components/CardItem";
import { RawBeach } from "@infrastructure/beaches/types";
import styles from "./CardList.module.css";

interface CardListProps {
  items: RawBeach[];
  title: string;
}

export const CardList = ({ items, title }: CardListProps) => {
  return (
    <>
      <p className={styles.title}>{title}</p>
      <div className={styles.wrapper}>
        {items.map((item) => (
          <CardItem key={item.id} data={item} />
        ))}
      </div>
    </>
  );
}
