import { observer } from 'mobx-react-lite';
import styles from './DropdownMenu.module.css';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { Link } from 'react-router-dom';

export const DropdownMenu = observer(() => {
  return (
    <div className={styles.container}>
      <Link to={'/profile/edit'} className={styles.link}>
        <Icon name={'edit'} size={'small'} />
        <span>Изменить информацию</span>
      </Link>
      <Link to={'/payment-methods'} className={styles.link}>
        <Icon name={'credit-card'} size={'small'} />
        <span>Способ оплаты</span>
      </Link>
      <Link to={'/notifications/settings'} className={styles.link}>
        <Icon name={'notifi'} size={'small'} />
        <span>Настройка уведомлений</span>
      </Link>
      <Link to={'/support'} className={styles.link}>
        <Icon name={'help'} size={'small'} />
        <span>Помощь</span>
      </Link>
      <Link to={''} className={styles.link}>
        <Icon name={'exit'} size={'small'} />
        <span>Выход</span>
      </Link>
    </div>
  );
});
