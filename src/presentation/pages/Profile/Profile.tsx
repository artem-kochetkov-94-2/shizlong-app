import styles from './Profile.module.css';
import { IconButton } from '@src/presentation/ui-kit/IconButton';
import backgroundImg from './assets/waves.png';
import classNames from 'classnames';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DropdownMenu } from './components/DropdownMenu/DropdownMenu';
import { Routes } from '@src/routes';
import { notificationsStore } from '@src/application/store/notificationsStore';
import { paymentStore } from '@src/application/store/paymentStore';
import { UserInfo } from './components/UserInfo/UserInfo';
import { ClientContent } from './components/ClientContent';
import { profileStore } from '@src/application/store/profileStore';
import { CashierContent } from './components/CashierContent';

export const Profile = observer(() => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isSubscribedToTelegram } = notificationsStore;
  const { tokens } = paymentStore;
  const { isCashier } = profileStore;

  const navigate = useNavigate();

  return (
    <div className={styles.profile}>
      <div className={styles.header} style={{ backgroundImage: `url(${backgroundImg})` }}>
        <IconButton
          iconName='arrow-left'
          size='medium'
          shape='rounded'
          withBorder
          withBlur
          onClick={() => navigate(-1)}
        />

        <UserInfo />

        <IconButton
          iconName='settings'
          size='medium'
          shape='rounded'
          withBorder
          withBlur
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.actions}>
          {/* @todo */}
          <div
            className={classNames(
              styles.actionItem,
              styles.notifications,
              styles.actionItemDisabled
            )}
            // onClick={() => navigate(Routes.Notifications)}
          >
            <IconButton iconName='bell' size='large' withBorder withBlur />
            <span>Уведомления</span>
            <span className={styles.notificationsCount}>1</span>
          </div>

          <div className={styles.actionItem} onClick={() => navigate(Routes.Favorites)}>
            <IconButton iconName='favorite-outline' size='large' withBorder withBlur />
            <span>Избранное</span>
          </div>

          {/* @todo */}
          <div
            className={classNames(styles.actionItem, styles.actionItemDisabled)}
            // onClick={() => navigate(Routes.Abonements)}
          >
            <IconButton iconName='abonement' size='large' withBorder withBlur />
            <span className={styles.abonement}>
              <span>Абонемент</span>
              <span className={styles.abonementCount}>1</span>
            </span>
          </div>
        </div>

        <div className={styles.reminders}>
          {/* @todo */}
          {/* <div className={styles.reminderItem}>
            <Icon size='small' name='profile-circle' />
            <span>Добавить фото и имя</span>
            <Icon size='small' name='arrow-right' />
          </div> */}
          {!tokens.length && (
            <div className={styles.reminderItem} onClick={() => navigate(Routes.PaymentMethodsAdd)}>
              <Icon size='small' name='card' />
              <span>Привязать банковскую карту</span>
              <Icon size='small' name='arrow-right' />
            </div>
          )}
          {!isSubscribedToTelegram && (
            <div
              className={styles.reminderItem}
              onClick={() => navigate(Routes.NotificationSettings)}
            >
              <Icon size='small' name='bell' />
              <span>Настроить уведомления</span>
              <Icon size='small' name='arrow-right' />
            </div>
          )}
          {/* @todo */}
          {/* <div className={styles.reminderItem}>
            <Icon size='small' name='check' />
            <span>Незавершённый заказ</span>
            <Icon size='small' name='arrow-right' />
          </div> */}
        </div>

        {isCashier ? <CashierContent /> : <ClientContent />}
      </div>

      {isDropdownOpen && <DropdownMenu />}
    </div>
  );
});
