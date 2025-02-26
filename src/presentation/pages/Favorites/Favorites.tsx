import { CardList } from "@presentation/components/CardList";
import { beachStore } from "@src/application/store/beachesStore";
import { observer } from "mobx-react-lite";
import styles from './Favorites.module.css';
import { Tabs, useTabs } from "@src/presentation/ui-kit/Tabs";
import { Tab } from "@src/presentation/ui-kit/Tabs/Tabs";
import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { useNavigate } from "react-router-dom";

export const tabs: Tab[] = [
    {
      value: 'beaches',
      label: 'Пляжи',
    },
];

export const Favorites = observer(() => {
    const { favoriteBeaches } = beachStore;
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
                <CardList items={favoriteBeaches} />
            </div>
        </div>
    );
});
