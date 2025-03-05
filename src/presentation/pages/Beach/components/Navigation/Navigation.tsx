// import { Rating } from "@presentation/components/Rating";
// import { Tag } from "@presentation/ui-kit/Tag";
import { Tabs, useTabs } from "@src/presentation/ui-kit/Tabs";
import { RawLocation } from "@src/infrastructure/Locations/types";
import { locationTabs } from "@src/application/store/locationStore";
import { Images } from "./components/Images";
import styles from './Navigation.module.css';

export const Navigation = ({ location }: { location: RawLocation }) => {
  const { currentTab, setCurrentTab } = useTabs(locationTabs[0].value);

  return (
    <div className={styles.wrapper}>
      <Images items={[location.link_space]} />
      <div className={styles.category}>пляж</div>
      <div className={styles.name}>{location.name}</div>
      {/* <div className={styles.row}>
        <Rating value={location.rating} count={location.reviewsCount} />
        <Tag size="medium" text={`от ${location.price.toLocaleString('ru-RU')} ₽`} />
      </div> */}
      <Tabs
        tabs={locationTabs}
        activeTab={currentTab}
        onTabChange={setCurrentTab}
      />
    </div>
  );
}
