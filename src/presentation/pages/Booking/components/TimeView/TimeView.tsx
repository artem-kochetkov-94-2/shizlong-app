import { bookStore } from "@src/application/store/bookStore";
import { Card } from "@src/presentation/ui-kit/Card";
import { observer } from "mobx-react-lite";
import styles from './TimeView.module.css';

export const TimeView = observer(() => {
    const { formattedTime } = bookStore;

    return (
        <Card className={styles.card}>
            <div className={styles.time}>
                <div className={styles.cardTitle}>
                    <span>Часы</span>
                    <span>{formattedTime}</span>
                </div>
            </div>
        </Card>
    );
});
