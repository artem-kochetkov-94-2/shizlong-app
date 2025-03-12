import styles from './DropdownMenu.module.css';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { Link } from 'react-router-dom';
import { Routes } from '@src/routes';

export const DropdownMenu = () => {
  return (
    <div className={styles.container}>
      <Link to={Routes.ProfileEdit} className={styles.link}>
        <Icon name={'edit'} size={'small'} />
        <span>Изменить информацию</span>
      </Link>
      <Link to={Routes.PaymentMethods} className={styles.link}>
        <Icon name={'credit-card'} size={'small'} />
        <span>Способ оплаты</span>
      </Link>
      <Link to={Routes.NotificationSettings} className={styles.link}>
        <Icon name={'notifi'} size={'small'} />
        <span>Настройка уведомлений</span>
      </Link>
      <Link to={Routes.Support} className={styles.link}>
        <Icon name={'help'} size={'small'} />
        <span>Помощь</span>
      </Link>
      <Link to={''} className={styles.link}>
        <Icon name={'exit'} size={'small'} />
        <span>Выход</span>
      </Link>
    </div>
  );
};
