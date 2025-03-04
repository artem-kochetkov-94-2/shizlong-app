import { Button } from '@src/presentation/ui-kit/Button';
import styles from './EmailSettings.module.css';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { useState } from 'react';
import classNames from 'classnames';

export const EmailSettings = () => {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
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
          <div className={styles.email}>{email}</div>
          <Button
            variant={'tertiary'}
            size={'large'}
            className={styles.textColor}
            onClick={() => setIsAccept(!isAccept)}
          >
            Изменить e-mail
          </Button>
        </>
      )}
      {!isAccept && (
        <>
          <div className={styles.list}>1. Укажите e-mail</div>
          <div className={styles.inputContainer}>
            <label
              className={classNames(styles.label, {
                [styles.focus]: email || isFocused,
              })}
            >
              E-mail
            </label>
            <input
              type='email'
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
          <Button
            variant={'yellow'}
            size={'large'}
            onClick={() => setIsAccept(!isAccept)}
            disabled={email === ''}
          >
            Подтвердить e-mail
          </Button>
        </>
      )}
    </div>
  );
};
