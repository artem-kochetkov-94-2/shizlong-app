import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@src/presentation/ui-kit/Button';
import { CopyableDiv } from '@src/presentation/ui-kit/CopyableDiv';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { notificationsStore } from '@src/application/store/notificationsStore';
import styles from './TelegramSettings.module.css';

export const TelegramSettings = observer(() => {
  const code = notificationsStore.telegramCode;
  const status = notificationsStore.notifications[0].status;

  const telegramBotLink = 'https://t.me/test_shezlong_bot';

  useEffect(() => {
    notificationsStore.checkTelegramStatus();
    notificationsStore.getTelegramCode();
  }, []);

  return (
    <div className={styles.telegramSettings}>
      {status && (
        <div className={styles.reminderItem}>
          <Icon size='small' name='check5' />
          <span>Уведомления настроены</span>
        </div>
      )}
      <div className={styles.desc}>
        Вы можете настроить уведомления о новых событиях на сайте в ваш Telergam. Для
        этого мы создали официального Telegram-бота
      </div>
      <div className={styles.list}>1. Скопируйте код</div>
      <CopyableDiv className={styles.margin} size={'large'}>
        {code}
      </CopyableDiv>
      <div className={styles.list}>2. Отправьте код боту </div>
      <Button
        variant={'yellow'}
        size={'large'}
        onClick={() => window.open(telegramBotLink, '_blank')}
      >
        Подключить
      </Button>
    </div>
  );
});
