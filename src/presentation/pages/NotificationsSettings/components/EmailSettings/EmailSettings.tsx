import { Button } from '@src/presentation/ui-kit/Button';
import styles from './EmailSettings.module.css';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { useState } from 'react';
import { StyledInput } from '@src/presentation/ui-kit/StyledInput';

export const EmailSettings = () => {
  const [isAccept, setIsAccept] = useState(false);

  return (
    <div className={styles.telegramSettings}>
      {isAccept && (
        <>
          <div className={styles.reminderItem}>
            <Icon size='small' name='check5' />
            <span>Уведомления настроены</span>
          </div>
          <div className={styles.emailHeader}>E-mail</div>
          <div className={styles.email}>MargoSokolova@mail.ru</div>
          <Button
            variant={'gray2'}
            size={'large'}
            onClick={() => setIsAccept(!isAccept)}
          >
            Изменить e-mail
          </Button>
        </>
      )}
      {!isAccept && (
        <>
          <div className={styles.list}>1. Укажите e-mail</div>
          <StyledInput placeholder='E-mail' type={'e-mail'} />
          <Button
            variant={'yellow'}
            size={'large'}
            onClick={() => setIsAccept(!isAccept)}
          >
            Подтвердить e-mail
          </Button>
        </>
      )}
    </div>
  );
};
