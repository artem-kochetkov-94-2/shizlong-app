import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import styles from './PageHeader.module.css';
import { IconButton } from '../IconButton';

interface PageHeaderProps {
  children: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageHeader}>
      <IconButton
        onClick={() => navigate(-1)}
        iconName="arrow-left"
        size="large"
        shape="rounded"
      />
      <span>{children}</span>
    </div>
  );
};
