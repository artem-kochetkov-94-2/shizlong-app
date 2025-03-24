import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import styles from './PageHeader.module.css';
import { IconButton } from '../IconButton';

interface PageHeaderProps {
  children: ReactNode;
  subHeader?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ children, subHeader }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageHeader}>
      <IconButton
        onClick={() => navigate(-1)}
        iconName='arrow-left'
        size='medium'
        shape='rounded'
        color='white'
        iconColor='dark'
      />
      <div className={styles.header}>
        <span>{children}</span>
        {subHeader && <div className={styles.subheader}>{subHeader}</div>}
      </div>
    </div>
  );
};
