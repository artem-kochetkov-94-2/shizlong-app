import { useState } from 'react';
import { PageHeader } from '@src/presentation/ui-kit/PageHeader';
import { RadioItem } from '@src/presentation/ui-kit/RadioItem';
import styles from './NotificationsSettings.module.css';
import { notificationsStore } from '@src/application/store/notificationsStore';
import { observer } from 'mobx-react-lite';

export const NotificationsSettings = observer(() => {
  const { notifications } = notificationsStore;
  const [selected, setSelected] = useState<string>(notifications[0].id);

  return (
    <div className={styles.NotificationsSettings}>
      <PageHeader topPadding>Настройка уведомлений</PageHeader>
      <div className={styles.subHeader}>Выберите способ уведомления</div>

      <div className={styles.radioGroup}>
        {notificationsStore.notifications.map(
          ({ id, label, content, status, statusText, disabled, caption }) => (
            <RadioItem
              key={id}
              id={id}
              label={label}
              caption={caption}
              selected={selected}
              status={status}
              onClick={() => setSelected(id)}
              disabled={disabled}
              statusText={statusText}
            >
              {content}
            </RadioItem>
          )
        )}
      </div>
    </div>
  );
});
