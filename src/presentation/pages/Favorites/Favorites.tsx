import { CardList } from "@presentation/components/CardList";
import { locationsStore } from "@src/application/store/locationsStore";
import { observer } from "mobx-react-lite";
import styles from './Favorites.module.css';
import { Tabs, useTabs } from "@src/presentation/ui-kit/Tabs";
import { Tab } from "@src/presentation/ui-kit/Tabs/Tabs";
import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { useNavigate } from "react-router-dom";

export const tabs: Tab[] = [
    {
      value: 'locations',
      label: 'Пляжи',
    },
];

export const Favorites = observer(() => {
    const { favoriteLocations } = locationsStore;
    const { currentTab, setCurrentTab } = useTabs(tabs[0].value);
    const navigate = useNavigate();

    return (
        <div className={styles.favorites}>
            <div className={styles.header}>
                <div className={styles.navigation}>
                    <IconButton
                        iconName="arrow-left"
                        size="medium"
                        withBorder
                        withBlur
                        shape="rounded"
                        color="white"
                        onClick={() => navigate(-1)}
                    />
                    <span className={styles.title}>Избранное</span>
                    <span className={styles.count}>5</span>
                </div>
                <Tabs
                    tabs={tabs}
                    activeTab={currentTab}
                    onTabChange={setCurrentTab}
                />
            </div>
            <div className={styles.content}>
                <CardList items={favoriteLocations} />
            </div>
        </div>
    );
});
