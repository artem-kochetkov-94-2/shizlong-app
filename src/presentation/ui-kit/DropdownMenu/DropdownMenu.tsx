import styles from './DropdownMenu.module.css';
import classNames from 'classnames';

interface DropdownMenuItem {
  open: boolean;
  children: React.ReactNode;
  className?: string;
}

export const DropdownMenu = ({ open, children, className }: DropdownMenuItem) => {
  if (!open) return null;

  return (
    <div className={classNames(styles.container, className)}>
      {children}
    </div>
  );
};
