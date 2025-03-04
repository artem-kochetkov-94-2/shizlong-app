import { Button } from '@src/presentation/ui-kit/Button';
import styles from './TelegramSettings.module.css';
import { CopyableDiv } from '@src/presentation/ui-kit/CopyableDiv';
import { Icon } from '@src/presentation/ui-kit/Icon';

export const TelegramSettings = () => {

  return (
    <div className={styles.telegramSettings}>
        <div className={styles.reminderItem}>
          <Icon size='small' name='check5' />
          <span>Уведомления настроены</span>
        </div>
        <div className={styles.desc}>
          Вы можете настроить уведомления о новых событиях на сайте в ваш Telergam. 
          Для этого мы создали официального Telegram-бота
        </div>
        <div className={styles.list}>1. Скопируйте код</div>
        <CopyableDiv className={styles.margin} size={"large"}>3516135491</CopyableDiv>
        <div className={styles.list}>2. Отправьте код боту </div>
        <Button variant={'yellow'} size={"large"}>Подключить</Button>
    </div>
  );
};
