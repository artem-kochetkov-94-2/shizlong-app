import styles from './Profile.module.css';
import { IconButton } from '@src/presentation/ui-kit/IconButton';
import backgroundImg from './assets/waves.png';
import classNames from 'classnames';
import { Icon } from '@src/presentation/ui-kit/Icon';
import bookingsEmptyImg from './assets/empty.svg';
import { bookingsStore } from '@src/application/store/bookingsStore';
import { Tabs, useTabs } from '@src/presentation/ui-kit/Tabs';
import { Tab } from '@src/presentation/ui-kit/Tabs/Tabs';
import { CompletedBookings } from './components/CompletedBookings/CompletedBookings';
import { CurrentBookings } from './components/CurrentBookings/CurrentBookings';
import { observer } from 'mobx-react-lite';
// import { Rating } from '@src/presentation/components/Rating';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useRef, useState } from 'react';
import { DropdownMenu } from './components/DropdownMenu/DropdownMenu';
import { Routes } from '@src/routes';
import { notificationsStore } from '@src/application/store/notificationsStore';
import { paymentStore } from '@src/application/store/paymentStore';
import { profileStore } from '@src/application/store/profileStore';
import { formatPhoneNumber } from '@src/application/utils/formatPhone';

export const bookingsTabs: Tab[] = [
  {
    value: 'current',
    label: 'Актуальные',
  },
  {
    value: 'completed',
    label: 'Завершённые',
  },
];

export const Profile = observer(() => {
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { iosEmptyBookings } = bookingsStore;
  const { currentTab, setCurrentTab } = useTabs(bookingsTabs[0].value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currentBookings, completedBookings } = bookingsStore;
  const { isSubscribedToTelegram } = notificationsStore;
  const { tokens } = paymentStore;
  const { profile } = profileStore;

  const navigate = useNavigate();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedAvatar(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

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

        <div className={styles.userInfo}>
          <div
            className={classNames(styles.avatar, !selectedAvatar && styles.avatarEmpty)}
            onClick={handleAvatarClick}
          >
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            {!selectedAvatar && <Icon name={'profile'} />}
            {selectedAvatar && <img src={URL.createObjectURL(selectedAvatar)} alt='' />}
          </div>
          <div>
            <div className={styles.userName}>
              {profile.name} {profile.last_name}
            </div>
            <div className={styles.userPhone}>
              {formatPhoneNumber(profile.phone || '')}
            </div>
            {/* @todo */}
            {/* <Rating value={4.8} count={5} showCount={false} /> */}
          </div>
        </div>

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
            <div className={styles.reminderItem}>
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

        <div className={styles.bookings}>
          <div className={styles.bookingsTitle}>Бронирования</div>

          {iosEmptyBookings ? (
            <div className={styles.bookingsEmpty}>
              <div className={styles.bookingsEmptyTitle}>У вас пока нет броней</div>
              <img src={bookingsEmptyImg} />
            </div>
          ) : (
            <>
              <Tabs
                tabs={bookingsTabs.map((t) => {
                  return {
                    ...t,
                    label:
                      t.value === 'current'
                        ? `Актуальные ${currentBookings.length}`
                        : `Завершённые ${completedBookings.length}`,
                  };
                })}
                activeTab={currentTab}
                onTabChange={setCurrentTab}
              />

              {currentTab === 'current' && <CurrentBookings />}
              {currentTab === 'completed' && <CompletedBookings />}
            </>
          )}
        </div>
      </div>
      {isDropdownOpen && <DropdownMenu />}
    </div>
  );
});
