import { observer } from "mobx-react-lite";
import { bookStore } from "@src/application/store/bookStore";
import { Card } from "@src/presentation/ui-kit/Card";
import { Icon } from "@src/presentation/ui-kit/Icon";
import styles from './Date.module.css';

interface DateProps {
    onCalendarClick: () => void;
}

export const Date = observer(({ onCalendarClick }: DateProps) => {
    const { formattedDate } = bookStore;

    return (
        <Card className={styles.card}>
            <div className={styles.date}>
                <div className={styles.cardTitle}>
                    <span>Дата</span>
                    <span>{formattedDate}</span>
                </div>

                <Icon name="calendar" size="small" onClick={onCalendarClick} />
            </div>
        </Card>
    );
});
