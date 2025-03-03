import { useNavigate } from "react-router-dom";
import { IconButton } from "@src/presentation/ui-kit/IconButton";
import styles from './Header.module.css';
import { RawSector } from "@src/infrastructure/Locations/types";

export const Header = ({ name, sector }: { name: string, sector: RawSector }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.header}>
            <IconButton
                iconName="arrow-left"
                size="medium"
                onClick={() => navigate(-1)}
                className={styles.backButton}
                shape="rounded"
                color="white"
            />
            <div className={styles.title}>
                <span className={styles.category}>Сектор {sector.name}</span>
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
        </div>
    );
}
