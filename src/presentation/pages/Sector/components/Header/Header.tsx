import { useNavigate } from "react-router-dom";
import { IconButton } from "@src/presentation/ui-kit/IconButton";
import styles from './Header.module.css';
import { RawSector } from "@src/infrastructure/Locations/types";
import { observer } from "mobx-react-lite";
import { locationStore } from "@src/application/store/locationStore";
import classNames from "classnames";
import { Routes } from '@src/routes';

export const Header = observer(({
    name,
    sector,
}: {
    name: string,
    sector: RawSector,
}) => {
    const navigate = useNavigate();
    const { sectors } = locationStore;

    return (
        <div className={styles.header}>
            <IconButton
                iconName="arrow-left"
                size="medium"
                onClick={() => navigate(Routes.Location.replace(':id', sector.location_id.toString()))}
                className={styles.backButton}
                shape="rounded"
                color="white"
            />
            <div className={styles.title}>
                <span className={styles.category}>{sector.name}</span>
                <span className={styles.name}>{name}</span>
            </div>
            <div className={styles.icons}>
                <IconButton
                    iconName="favorite-outline"
                    size="medium"
                    shape="rounded"
                    color="white"
                />
                <IconButton
                    iconName="route"
                    size="medium"
                    shape="rounded"
                    color="white"
                />
            </div>

            <div className={styles.slides}>
                {sectors.map((s) => (
                    <div
                        key={s.id}
                        className={classNames(styles.slidesItem, {
                            [styles.slidesItemActive]: sector.id === s.id,
                        })}
                        style={{ width: `${100 / sectors.length}%` }}
                    />
                ))}
            </div>
        </div>
    );
});
