import { HTMLAttributes, ReactNode } from 'react';
import styles from './RadioItem.module.css';
import cn from 'classnames';
import { Icon } from '../Icon';

interface RadioItemProps extends HTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  id: string;
  label: string;
  selected: string;
  statusState: 'error' | 'success';
  status?: string;
  onClick: () => void;
}

export const RadioItem: React.FC<RadioItemProps> = ({
  children,
  id,
  label,
  status,
  statusState,
  onClick,
  selected,
}) => {
  return (
    <div key={id} className={styles.radioItem} onClick={onClick}>
      <label htmlFor={id} className={styles.radioLabel}>
        <div className={styles.checkContainer}>
          <input
            type='radio'
            id={id}
            name='radio'
            className={styles.radioInput}
            defaultChecked={selected === id}
          />
          <span className={`${selected === id ? styles.open : ''}`}>{label}</span>
        </div>
        {selected === id && (
          <div className={cn(styles.status, styles[statusState])}>
            <span>{status}</span>
            {statusState === 'success' && <Icon name='check4' size='small' />}
          </div>
        )}
      </label>
      <div
        className={`${styles.expandableContent} ${selected === id ? styles.open : ''}`}
      >
        {selected === id && children}
      </div>
    </div>
  );
};
