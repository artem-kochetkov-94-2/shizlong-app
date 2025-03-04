import { useState } from 'react';
import { Button } from '@src/presentation/ui-kit/Button';
import { Icon } from '@src/presentation/ui-kit/Icon';
import styles from './PushSettings.module.css';

export const PushSettings = () => {
  const [isDownload, setIsDownload] = useState(false);
  const [isPush, setIsPush] = useState(false);

  return (
    <div className={styles.telegramSettings}>
      <div className={styles.desc}>
        Для получения PUSH-уведомлений на свой телефон установите приложение «Шезлонгер».
      </div>

      {isDownload ? (
        <>
          <div className={styles.reminderItem}>
            <Icon size='small' name='check5' />
            <span>Приложение установлено</span>
          </div>

          {!isPush && (
            <Button variant={'yellow'} size={'large'} onClick={() => setIsPush(true)}>
              Разрешить отправку PUSH
            </Button>
          )}

          {isPush && (
            <div className={styles.reminderItem}>
              <Icon size='small' name='check5' />
              <span>Уведомления разрешены</span>
            </div>
          )}
        </>
      ) : (
        <Button
          variant={'tertiary'}
          size={'large'}
          className={styles.textColor}
          onClick={() => setIsDownload(true)}
        >
          <Icon name={'download'} size={'extra-small'} />
          Скачать приложение
        </Button>
      )}
    </div>
  );
};
