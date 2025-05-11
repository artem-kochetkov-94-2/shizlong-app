import { ReactNode } from 'react';
import { Icon } from '../Icon';
import cn from 'classnames';
import styles from './RadioItem.module.css';

export interface RadioItemProps {
  children?: ReactNode;
  caption?: ReactNode;
  id: string;
  label: string;
  selected: string;
  status?: boolean;
  statusText?: string;
  onClick: (id: string) => void;
  disabled?: boolean;
}

export const RadioItem: React.FC<RadioItemProps> = ({
  children,
  id,
  label,
  status,
  statusText,
  onClick,
  selected,
  disabled,
  caption,
}) => {
  return (
    <div
      key={id}
      className={cn(styles.radioItem, { [styles.disabled]: disabled })}
      onClick={!disabled ? () => onClick(id) : undefined}
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
        {caption}
        {selected === id && (
          <div
            className={cn(styles.status, {
              [styles.error]: !status,
            })}
          >
            {!status ? (
              <span>{statusText}</span>
            ) : (
              <>
                <span>Выбрано</span>
                <Icon name='check4' size='small' />
              </>
            )}
          </div>
        )}
      </label>
      {children && (
        <div className={`${styles.expandableContent} ${selected === id ? styles.open : ''}`}>
          {selected === id && children}
        </div>
      )}
    </div>
  );
};
