import styles from './Profile.module.css';
import { IconButton } from '@src/presentation/ui-kit/IconButton';
import backgroundImg from './assets/waves.png';
import classNames from 'classnames';
import { Icon } from '@src/presentation/ui-kit/Icon';

export const Profile = () => {
    const avatar = 'https://placehold.co/64x64';

    return (
        <div className={styles.profile}>
            <div className={styles.header} style={{ backgroundImage: `url(${backgroundImg})` }}>
                <IconButton
                    iconName="arrow-left"
                    size="medium"
                    shape="rounded"
                    withBorder
                    withBlur
                />

                <div className={styles.userInfo}>
                    <div className={classNames(styles.avatar, !avatar && styles.avatarEmpty)}>
                        {avatar && <img src={avatar} alt="" />}
                    </div>
                    <div>
                        <div className={styles.userName}>User 2458</div>
                        <div className={styles.userPhone}>+7 (925) 222-33-44</div>
                    </div>
                </div>

                <IconButton
                    iconName="settings"
                    size="medium"
                    shape="rounded"
                    withBorder
                    withBlur
                />
            </div>

            <div className={styles.container}>
                <div className={styles.actions}>
                    <div className={styles.actionItem}>
                        <IconButton
                            iconName="bell"
                            size="large"
                            withBorder
                            withBlur
                        />
                        <span>Уведомления</span>
                    </div>
                    <div className={styles.actionItem}>
                        <IconButton
                            iconName="favorite-outline"
                            size="large"
                            withBorder
                            withBlur
                        />
                        <span>Избранное</span>
                    </div>
                    <div className={styles.actionItem}>
                        <IconButton
                            iconName="abonement"
                            size="large"
                            withBorder
                            withBlur
                        />
                        <span>Абонемент</span>
                    </div>
                </div>

                <div className={styles.reminders}>
                    <div className={styles.reminderItem}>
                        <Icon size="small" name="profile-circle" />
                        <span>Добавить фото и имя</span>
                        <Icon size="small" name="arrow-right" />
                    </div>
                    <div className={styles.reminderItem}>
                        <Icon size="small" name="card" />
                        <span>Привязать банковскую карту</span>
                        <Icon size="small" name="arrow-right" />
                    </div>
                    <div className={styles.reminderItem}>
                        <Icon size="small" name="bell" />
                        <span>Настроить уведомления</span>
                        <Icon size="small" name="arrow-right" />
                    </div>
                </div>
            </div>

            <div className={styles.bookings}>
                <div className={styles.bookingsHeader}>
                    <span>Мои бронирования</span>
                    <Icon size="small" name="arrow-right" />
                </div>                
            </div>
        </div>
    )
}
