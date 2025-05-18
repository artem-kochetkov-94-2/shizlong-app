import { locationStore } from "@src/application/store/locationStore";
import { sectorStore } from "@src/application/store/sectorStore";
import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { observer } from "mobx-react-lite";
import styles from './Header.module.css';
import { useNavigate } from "react-router-dom";
import { bookStore } from "@src/application/store/bookStore";

export const Header = observer(() => {
    const navigate = useNavigate();
    const { location } = locationStore;
    const { sector } = sectorStore;
    const { bookModules } = bookStore;

    return (
        <div className={styles.header}>
            <IconButton
                iconName="arrow-left"
                size="medium"
                shape="rounded"
                color="white"
                onClick={() => navigate(-1)}
            />
            <div className={styles.headerContent}>
                <div className={styles.title}>
                    {bookModules.size === 1 ? 'Заказать один модуль' : 'Заказать группу модулей'}
                </div>
                <div className={styles.subtitle}>{sector?.name} пляжа {location?.name}</div>
            </div>
        </div>
    );
});
