import { observer } from "mobx-react-lite";
import styles from "./Abonements.module.css";
import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { useNavigate } from "react-router-dom";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { Tag } from "@src/presentation/ui-kit/Tag";
import wavesBg from './assets/waves.png';
import { Routes } from "@src/routes";
import { Left } from "@src/presentation/components/Left";

export const Abonements = observer(() => {
    const navigate = useNavigate();

    return (
        <div className={styles.abonements}>
            <div className={styles.header} style={{ backgroundImage: `url(${wavesBg})` }}>
                <div className={styles.navigation}>
                    <IconButton
                        iconName="arrow-left"
                        size="medium"
                        withBorder
                        withBlur
                        shape="rounded"
                        onClick={() => navigate(-1)}
                    />
                    <span className={styles.title}>Мои абонементы</span>
                    <span className={styles.count}>2</span>
                </div>
            </div>
            <div className={styles.content}>
                {[1, 2].map((_, i) => (
                    <div className={styles.abonementWrapper} key={i}>
                        <div className={styles.decoration} style={i === 0 ? { background: 'transparent' } : {}} />
                        <div className={styles.abonement}>
                            <div className={styles.abonementHeader}>
                                <IconButton
                                    iconName="calendar"
                                    size="medium"
                                    withBorder
                                    withBlur
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
                                    <Tag text="весь день" size="medium" />
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
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});
