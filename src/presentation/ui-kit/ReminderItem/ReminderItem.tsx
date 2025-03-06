import { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';
import { IconName } from '../Icon/types';
import cn from 'classnames';
import styles from './ReminderItem.module.css';

interface ReminderItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'gray' | 'orange' | 'yellow' | 'disabled';
  iconName?: IconName;
  arrow?: boolean;
}

export const ReminderItem: React.FC<ReminderItemProps> = ({
  children,
  iconName = 'check4',
  variant = 'default',
  arrow,
  className,
  ...props
}) => {
  return (
    <div className={cn(styles.reminderItem, styles[variant], className, { ...props })}>
      <Icon size='small' name={iconName} />
      <span>{children}</span>
      {arrow && <Icon size='small' name='arrow-right' />}
    </div>
  );
};
