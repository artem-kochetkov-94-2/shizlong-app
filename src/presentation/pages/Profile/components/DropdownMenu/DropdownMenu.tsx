import styles from './DropdownMenu.module.css';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { Link } from 'react-router-dom';
import { Routes } from '@src/routes';
import { userStore } from '@src/application/store/userStore';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { profileStore } from '@src/application/store/profileStore';

export const DropdownMenu = observer(() => {
  const { isCashier } = profileStore;

  const navigate = useNavigate();
  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    userStore.logout(() => {
      navigate(Routes.Locations);
    });
  };

  return (
    <div className={styles.container}>
      <Link to={Routes.ProfileEdit} className={styles.link}>
        <Icon name={'edit'} size={'small'} />
        <span>Изменить информацию</span>
      </Link>
      {!isCashier && (
        <Link to={Routes.PaymentMethods} className={styles.link}>
          <Icon name={'credit-card'} size={'small'} />
          <span>Способ оплаты</span>
        </Link>
      )}
      
      <Link to={Routes.NotificationSettings} className={styles.link}>
        <Icon name={'notifi'} size={'small'} />
        <span>Настройка уведомлений</span>
      </Link>
      <Link to={Routes.Support} className={styles.link}>
        <Icon name={'help'} size={'small'} />
        <span>Помощь</span>
      </Link>
      <Link to={'#'} className={styles.link} onClick={handleLogout}>
        <Icon name={'exit'} size={'small'} />
        <span>Выход</span>
      </Link>
    </div>
  );
});
