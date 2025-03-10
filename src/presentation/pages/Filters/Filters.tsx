import { observer } from 'mobx-react-lite';
import styles from './Filters.module.css';

export const Filters = observer(() => {
  return <div className={styles.favorites}>Фильтры</div>;
});
