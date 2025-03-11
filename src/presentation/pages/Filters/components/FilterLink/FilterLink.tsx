import { ReactNode, MouseEvent, HTMLAttributes } from 'react';
import { Icon } from '@src/presentation/ui-kit/Icon';
import styles from './FilterLink.module.css';
import cn from 'classnames';

interface FilterLinkProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  arrow?: boolean;
  onClick?: () => void;
  onClearFilter?: () => void;
}

export const FilterLink: React.FC<FilterLinkProps> = ({
  children,
  onClick,
  onClearFilter,
  arrow = true,
  className,
  ...props
}) => {
  const handleClearFilter = (
    event: MouseEvent<HTMLSpanElement>,
    onClearFilter?: () => void
  ) => {
    event.stopPropagation();
    onClearFilter?.();
  };

  return (
    <div className={cn(styles.filterLink, className, { ...props })} onClick={onClick}>
      {children}
      {arrow && <Icon name='arrow-right' size='small' className={styles.icon} />}
      {onClearFilter && (
        <div className={styles.button}>
          <span onClick={(e) => handleClearFilter(e, onClearFilter)}>Сбросить</span>
        </div>
      )}
    </div>
  );
};
