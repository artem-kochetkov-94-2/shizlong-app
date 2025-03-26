import { observer } from "mobx-react-lite";
import styles from './Notifications.module.css';
import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { useNavigate } from "react-router-dom";
import { notificationsStore } from "@src/application/store/notificationsStore";
import { Icon } from "@src/presentation/ui-kit/Icon";

export const Notifications = observer(() => {
    const navigate = useNavigate();
    const { notifications } = notificationsStore;

    return (
        <div className={styles.notifications}>
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
                    <span className={styles.title}>Уведомления</span>
                    <span className={styles.count}>18</span>
                </div>
            </div>
            <div className={styles.content}>
                {/* @ts-ignore */}
                {notifications.map((n: any) => {
                    return (
                        <div className={styles.notification}>
                            <IconButton
                                iconName="bell"
                                size="medium"
                                withBorder
                                withBlur
                                shape="rounded"
                                color="white"
                            />
                            <div className={styles.notificationContent}>
                                <span className={styles.notificationTitle}>
                                    У вас забронирован <span>шезлонг #23</span> на пляже <span>Ривьера</span>
                                </span>
                                <span className={styles.notificationDescription}>
                                    <Icon name="calendar" size="extra-small" />
                                    <span>12 июл 2025</span>
                                    <Icon name="time" size="extra-small" />
                                    <span>с 9:00 до 13:00</span>
                                </span>
                                <div className={styles.notificationLocation}>
                                    <Icon name="location" size="extra-small" />
                                    <span>Сочи, Ривьерский переулок 1</span>
                                </div>
                            </div>
                            <div className={styles.notificationTime}>2 часа назад</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});
