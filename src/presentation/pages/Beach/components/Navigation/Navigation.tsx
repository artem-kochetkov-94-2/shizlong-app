import { Rating } from "@presentation/components/Rating";
import { Tag } from "@presentation/ui-kit/Tag";
import { Tabs, useTabs } from "@src/presentation/ui-kit/Tabs";
import { RawBeach } from "@src/infrastructure/beaches/types";
import { beachTabs } from "@src/application/store/beach";
import { Images } from "./components/Images";
import styles from './Navigation.module.css';

export const Navigation = ({ beach }: { beach: RawBeach }) => {
  const { currentTab, setCurrentTab } = useTabs(beachTabs[0].value);

  return (
    <div>
      <Images items={beach.images} />
      <div className={styles.category}>{beach.category}</div>
      <div className={styles.name}>{beach.name}</div>
      <div className={styles.row}>
        <Rating value={beach.rating} count={beach.reviewsCount} />
        <Tag size="medium" text={`от ${beach.price.toLocaleString('ru-RU')} ₽`} />
      </div>
      <Tabs
        tabs={beachTabs}
        activeTab={currentTab}
        onTabChange={setCurrentTab}
      />
    </div>
  );
}
