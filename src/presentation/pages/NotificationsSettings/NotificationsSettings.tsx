import { Icon } from '@src/presentation/ui-kit/Icon';
import styles from './NotificationsSettings.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { items } from './const';

export const NotificationsSettings = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className={styles.NotificationsSettings}>
      <div className={styles.header}>
        <button 
          className={styles.button} 
          onClick={() => navigate(-1)}
        >
          <Icon name={'arrow-left'} size={'small'} color={'dark'} />
        </button>
        <span>Настройка уведомлений</span>
      </div>
      <div className={styles.subHeader}>Выберите способ уведомления</div>
      <div className={styles.radioGroup}>
        {items.map(({ id, label, content }) => (
          <div 
            key={id} 
            className={styles.radioItem} 
            onClick={() => setSelected(id)}
          >
            <label htmlFor={id} className={styles.radioLabel}>
              <div>
                <input 
                  type='radio'
                  id={id}
                  name='radio'
                  className={styles.radioInput}
                  defaultChecked={selected === id}
                />
                <span className={`${selected === id ? styles.open : ''}`}>{label}</span>
              </div>
              {selected === id && <span className={styles.status}>Установите приложение</span>}
            </label>
            <div className={`${styles.expandableContent} ${selected === id ? styles.open : ''}`}>
              {selected === id && content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
