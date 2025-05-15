import { observer } from "mobx-react-lite";
import styles from './Rules.module.css';

export const Rules = observer(() => {
    return (
        <div className={styles.rules}>
            Оформляя заказ, вы соглашаетесь с <span>Правилами пляжа</span>
        </div>
    );
});
