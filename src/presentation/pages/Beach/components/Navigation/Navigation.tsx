// import { Rating } from "@presentation/components/Rating";
import { Tag } from "@presentation/ui-kit/Tag";
import { Tabs, useTabs } from "@src/presentation/ui-kit/Tabs";
import { RawLocation } from "@src/infrastructure/Locations/types";
import { locationStore, locationTabs } from "@src/application/store/locationStore";
import { Images } from "./components/Images";
import styles from './Navigation.module.css';
import { observer } from "mobx-react-lite";

export const Navigation = observer(({ location, snap }: { location: RawLocation; snap: number }) => {
  const { currentTab, setCurrentTab } = useTabs(locationTabs[0].value);
  const { minServicePrice } = locationStore;

  if (snap === 2) {
    return (
      <div className={styles.wrapperShort}>
        <div className={styles.categoryShort}>пляж</div>
        <div className={styles.rowShort}>
          <div className={styles.nameShort}>{location.name}</div>
          <div className={styles.tagShort}>
            <Tag size="medium" text={`от ${minServicePrice?.price.formatted_value}`} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Images items={[location.link_space]} />
      <div className={styles.category}>пляж</div>
      <div className={styles.name}>{location.name}</div>
      <div className={styles.row}>
        {/* @TODO - рейтинг */}
        {/* <Rating value={4.2} count={1300} /> */}
        <Tag size="medium" text={`от ${minServicePrice?.price.formatted_value}`} />
      </div>
      <Tabs
        tabs={locationTabs}
        activeTab={currentTab}
        onTabChange={setCurrentTab}
      />
    </div>
  );
});
