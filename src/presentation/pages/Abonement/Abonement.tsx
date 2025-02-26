import { observer } from "mobx-react-lite";
import styles from "./Abonement.module.css";
import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { Tag } from "@src/presentation/ui-kit/Tag";
import { useNavigate } from "react-router-dom";
import { Features } from "@src/presentation/components/Features/Features";
import { FeatureItem } from "@src/presentation/components/Features/Features";
import { About } from "@src/presentation/components/About/About";
import { Left } from "@src/presentation/components/Left";

const features: FeatureItem[] = [
    {
        icon: 'https://placehold.co/24x24',
        name: 'Одиночный шезлонг пластиковый',
    },
    {
        icon: 'https://placehold.co/24x24',
        name: '2 шезлонга с зонтиком',
    },
    {
        icon: 'https://placehold.co/24x24',
        name: 'Качеля',
    },
];

const borderTop = (
    <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 11V7C1 3.68629 3.68629 1 7 1H21" stroke="#BEC5CF" stroke-linecap="round"/>
    </svg>
);

const borderBottom = (
    <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 1V5C21 8.31371 18.3137 11 15 11H0.999999" stroke="#BEC5CF" stroke-linecap="round"/>
    </svg>
);

export const Abonement = observer(() => {
    const navigate = useNavigate();

    return (
        <div className={styles.content}>
            <div className={styles.decoration} />

            <div className={styles.container}>
                <div className={styles.abonementWrapper}>
                    <div className={styles.abonement}>
                        <div className={styles.abonementHeader}>
                            <IconButton
                                iconName="arrow-left"
                                size="medium"
                                withBorder
                                withBlur
                                shape="rounded"
                                onClick={() => navigate(-1)}
                            />
                            <div className={styles.abonementHeadline}>
                                <span className={styles.abonementTitle}>Абонемент «Семейный»</span>
                                <span className={styles.abonementSubtitle}>действует до 22 авг 2025</span>
                            </div>
                            <IconButton
                                iconName="qr-code2"
                                size="medium"
                                withBorder
                                withBlur
                                shape="rounded"
                                color="white"
                            />
                        </div>
                        <div className={styles.abonementContent}>
                            <div className={styles.abonementsTime}>
                                <Icon name="time" size="extra-small" />
                                <span>с 8:00 до 20:00</span>
                                <Tag text="весь день" size="medium" />
                            </div>
                            <div className={styles.row}>
                                <Icon name="palm" size="extra-small" />
                                <div className={styles.rowTitle}>7 дней, 7 посещений</div>
                            </div>
                            <div className={styles.row}>
                                <Icon name="beach" size="extra-small" />
                                <div className={styles.rowTitle}>Доступные пляжи <span>2</span></div>
                            </div>
                            <div className={styles.buttons}>
                                <div className={styles.button}>Ривьера</div>
                                <div className={styles.button}>Санрайз</div>
                            </div>
                        </div> 
                    </div>
                </div>

                <Features title="Доступные модули" items={features} />

                <About />

                <div className={styles.paid}>
                    <div className={styles.paidButton}>
                        {borderTop}
                        Оплачено 7 900 ₽
                        {borderBottom}
                    </div>
                    <IconButton
                        iconName="check2"
                        size="medium"
                        withBorder
                        withBlur
                        shape="rounded"
                    />
                    <div className={styles.paidDate}>Куплен <br />12 авг 2025</div>
                </div>

                <div className={styles.accessories}>
                    <div className={styles.accessoriesHeader}>
                        <span>Пляжные аксессуары</span>
                        <span>включено в абонемент</span>
                    </div>
                    <ul className={styles.accessoriesList}>
                        <li className={styles.accessoriesItem}>
                            <div className={styles.accessoriesItemHeader}>
                                <Icon name="time" size="extra-small" />
                                <div>
                                    <span>Крем от солнца</span>
                                    <span>2 ед.</span>
                                </div>
                            </div>
                            <div className={styles.accessoryDetails}>
                                <span>Биокон Sun Time, 50мл.</span>
                                <span>GARNIER Ambre Solaire, 50мл.</span>
                            </div>
                        </li>
                        <li className={styles.accessoriesItem}>
                            <div className={styles.accessoriesItemHeader}>
                                <Icon name="time" size="extra-small" />
                                <div>
                                    <span>Полотенце</span>
                                    <span>2 ед.</span>
                                </div>
                            </div>
                        </li>
                        <li className={styles.accessoriesItem}>
                            <div className={styles.accessoriesItemHeader}>
                                <Icon name="time" size="extra-small" />
                                <div>
                                    <span>Пуфик</span>
                                    <span>3 ед.</span>
                                </div>
                            </div>
                        </li>
                        <li className={styles.accessoriesItem}>
                            <div className={styles.accessoriesItemHeader}>
                                <Icon name="time" size="extra-small" />
                                <div>
                                    <span>Столик</span>
                                    <span>1 ед.</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.footer}>
                <Left />
            </div>
        </div>
    );
});
