import { DrawerV2 } from "@src/presentation/ui-kit/DrawerV2"
import { IconButton } from "@src/presentation/ui-kit/IconButton"
import styles from "./Time.module.css";
import { Button } from "@src/presentation/ui-kit/Button";
import { Card } from "@src/presentation/ui-kit/Card";
import cn from "classnames";

export const Time = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    return (
        <DrawerV2 open={isOpen} onChange={onClose}>
            <div className={styles.calendar}>
                <div className={styles.header}>
                    <div className={styles.headerTitle}>Выберите день</div>
                    <div className={styles.headerDate}>24 августа 2025</div>

                    <IconButton
                        iconName="cross"
                        size="large"
                        shape="rounded"
                        className={styles.headerClose}
                        color="gray"
                        withShadow={false}
                    />
                </div>

                <div className={styles.body}>
                    <Card>

                    <div className={styles.reservations}>
                        <div className={cn(styles.reservation, styles.free)}>
                            <span>Свободен</span>
                            <span>09:00 - 13:00</span>
                            <span>4 ч.</span>
                        </div>
                        <div className={cn(styles.reservation, styles.free)}>
                            <span>Свободен</span>
                            <span>18:00 - 21:00</span>
                            <span>3 ч.</span>
                        </div>
                        <div className={cn(styles.reservation, styles.booked)}>
                            <span>Занят</span>
                            <span>13:00 - 18:00</span>
                            <span>5 ч.</span>
                        </div>
                    </div>
                    </Card>
                </div>

                <div className={styles.footer}>
                    <Button size="medium" variant="yellow">Выбрать</Button>
                    <Button size="medium" variant="tertiary" onClick={onClose}>Отмена</Button>
                </div>
            </div>
        </DrawerV2>
    );
}
