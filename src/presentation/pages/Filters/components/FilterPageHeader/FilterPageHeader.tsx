import { MouseEvent, ReactNode } from 'react';
import { IconButton } from '@src/presentation/ui-kit/IconButton';
import styles from './FilterPageHeader.module.css';

interface FilterPageHeader {
  children: ReactNode;
  onClick: () => void;
  onClearFilter?: () => void;
}

export const FilterPageHeader: React.FC<FilterPageHeader> = ({
  children,
  onClick,
  onClearFilter,
}) => {
  const handleClearFilter = (
    event: MouseEvent<HTMLSpanElement>,
    onClearFilter?: () => void
  ) => {
    event.stopPropagation();
    onClearFilter?.();
  };

  return (
    <div className={styles.pageHeader}>
      <IconButton onClick={onClick} iconName='arrow-left' size='large' shape='rounded' />
      <span>{children}</span>
      {onClearFilter && (
        <div className={styles.button}>
          <span onClick={(e) => handleClearFilter(e, onClearFilter)}>Сбросить</span>
        </div>
      )}
    </div>
  );
};
