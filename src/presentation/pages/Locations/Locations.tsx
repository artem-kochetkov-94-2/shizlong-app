import { observer } from "mobx-react-lite";
import { locationsStore } from "@src/application/store/locationsStore";
import { CardList } from "@presentation/components/CardList";
import { Navigation } from "./components/Navigation";
import { Menu } from "@src/presentation/components/Menu";
import { useEffect } from "react";
import styles from './Locations.module.css';
import { DrawerV2 } from "@src/presentation/ui-kit/DrawerV2";

export const Locations = observer(() => {
    const { locations } = locationsStore;

    useEffect(() => {
        locationsStore.init();
    }, []);

    return (
        <DrawerV2 overflowHeight={79} defaultOpen={true}>
            <Navigation />
            <div className={styles.content}>
                <Menu />
                <CardList title="Пляжи рядом" items={locations} category="пляж" />
            </div>
        </DrawerV2>
    );
});
