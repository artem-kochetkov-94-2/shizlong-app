import { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';
import cn from 'classnames';
import styles from './RadioItem.module.css';

interface RadioItemProps extends HTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  id: string;
  label: string;
  selected: string;
  statusState: 'error' | 'success';
  status?: string;
  onClick: () => void;
  disabled?: boolean;
}

export const RadioItem: React.FC<RadioItemProps> = ({
  children,
  id,
  label,
  status,
  statusState,
  onClick,
  selected,
  disabled,
}) => {
  return (
    <div
      key={id}
      className={cn(styles.radioItem, { [styles.disabled]: disabled })}
      onClick={!disabled ? onClick : undefined}
    >
      <label htmlFor={id} className={styles.radioLabel}>
        <div className={styles.checkContainer}>
          <input
            id={id}
            type='radio'
            name='radio'
            className={styles.radioInput}
            defaultChecked={selected === id}
            disabled={disabled}
          />
          <span className={`${selected === id ? styles.open : ''}`}>{label}</span>
        </div>
        {disabled && (
          <div>
            <span>В разработке</span>
          </div>
        )}
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
