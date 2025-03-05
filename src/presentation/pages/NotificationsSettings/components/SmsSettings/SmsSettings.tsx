import { Button } from '@src/presentation/ui-kit/Button';
import styles from './SmsSettings.module.css';

export const SmsSettings = () => {
  return (
    <div className={styles.telegramSettings}>
      <div className={styles.desc}>Уведомления будут приходить на ваш номер телефона</div>
      <div className={styles.phoneHeader}>Телефон</div>
      <div className={styles.phone}>+7 (925) 222-33-44</div>
      <Button variant={'gray2'} size={'large'}>
        Изменить телефон
      </Button>
    </div>
  );
};
