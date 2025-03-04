import { Icon } from '@src/presentation/ui-kit/Icon';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  children: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.pageHeader}>
      <button className={styles.button} onClick={() => navigate(-1)}>
        <Icon name={'arrow-left'} size={'small'} color={'dark'} />
      </button>
      <span>{children}</span>
    </div>
  );
};
