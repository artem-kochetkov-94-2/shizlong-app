import { useState } from 'react';
import { PageHeader } from '@src/presentation/ui-kit/PageHeader';
import { RadioItem } from '@src/presentation/ui-kit/RadioItem';
import styles from './NotificationsSettings.module.css';
import { items } from './const';

export const NotificationsSettings = () => {
  const [selected, setSelected] = useState<string>('');

  return (
    <div className={styles.NotificationsSettings}>
      <PageHeader>Настройка уведомлений</PageHeader>
      <div className={styles.subHeader}>Выберите способ уведомления</div>

      <div className={styles.radioGroup}>
        {items.map(({ id, label, content, status, disabled }) => (
          <RadioItem
            key={id}
            id={id}
            label={label}
            selected={selected}
            status={status}
            onClick={() => setSelected(id)}
            disabled={disabled}
            statusText={''}
          >
            {content}
          </RadioItem>
        ))}
      </div>
    </div>
  );
};
