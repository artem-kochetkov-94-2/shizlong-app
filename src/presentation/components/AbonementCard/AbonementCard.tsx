import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { Routes } from "@src/routes";
import styles from './AbonementCard.module.css';
import { Icon } from "@src/presentation/ui-kit/Icon";
import { Tag } from "@src/presentation/ui-kit/Tag";
import { Left } from "../Left";
import { useNavigate } from "react-router-dom";

export const AbonementCard = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.abonementWrapper}>
            <div className={styles.decoration} />
            <div className={styles.abonement}>
                <div className={styles.abonementHeader}>
                    <IconButton
                        iconName="abonement"
                        size="medium"
                        withBorder
                        withBlur
                        color="secondary"
                    />
                    <div className={styles.abonementHeadline}>
                        <span className={styles.abonementTitle}>Абонемент «Семейный»</span>
                        <span className={styles.abonementSubtitle}>действует до 22 авг 2025</span>
                    </div>
                    <IconButton
                        iconName="arrow-right"
                        size="medium"
                        withBorder
                        withBlur
                        shape="rounded"
                        color="white"
                        iconColor="secondary"
                        onClick={() => navigate(Routes.Abonement)}
                    />
                </div>
                <div className={styles.abonementDescription}>
                    Одиночный шезлонг, 2 шезлонга с зонтиком, Качеля, Бунгало
                </div>
                <div className={styles.abonementServices}>
                    <div className={styles.abonementService}>
                        <span className={styles.abonementServiceTitle}>Пляжные аксессуары</span>
                        <span className={styles.abonementServiceDescription}>Крем от солнца, Полотенце (2 шт.)</span>
                    </div>
                </div>
                <div className={styles.abonementContent}>
                    <div className={styles.abonementsTime}>
                        <Icon name="time" size="extra-small" />
                        <span>с 8:00 до 20:00</span>
                        <Tag text="весь день" size="medium" color="secondary" />
                    </div>

                    <Left />

                    <div>
                        <div className={styles.row}>
                            <Icon name="beach" size="extra-small" />
                            <div className={styles.rowTitle}><span>Доступные пляжи</span> 2</div>
                        </div>
                        <div className={styles.buttons}>
                            <div className={styles.button}>Ривьера</div>
                            <div className={styles.button}>Санрайз</div>
                        </div>
                    </div>

                    <div>
                        <div className={styles.row}>
                            <Icon name="beach" size="extra-small" />
                            <div className={styles.rowTitle}>5 посещений за 10 дней</div>
                            <span className={styles.rowExtra}>12 900 ₽</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
