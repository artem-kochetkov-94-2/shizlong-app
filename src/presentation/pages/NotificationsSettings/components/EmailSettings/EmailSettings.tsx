import { useState } from 'react';
import { Button } from '@src/presentation/ui-kit/Button';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { StyledInput } from '@src/presentation/ui-kit/StyledInput';
import styles from './EmailSettings.module.css';

export const EmailSettings: React.FC = () => {
  const [isAccept, setIsAccept] = useState(false);
  const [email, setEmail] = useState('');

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

          <Button variant={'gray2'} size={'large'} onClick={() => setIsAccept(!isAccept)}>
            Изменить e-mail
          </Button>
        </>
      )}

      {!isAccept && (
        <>
          <div className={styles.list}>1. Укажите e-mail</div>
          <StyledInput
            placeholder='E-mail'
            type={'e-mail'}
            value={email}
            onChange={setEmail}
          />
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
