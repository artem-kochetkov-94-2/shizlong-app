import { ReactNode } from 'react';
import styles from './CheckBoxes.module.css';

interface CheckBoxesProps {
  children: ReactNode;
}

export const CheckBoxes: React.FC<CheckBoxesProps> = ({ children }) => {
  return <div className={styles.checkBoxes}>{children}</div>;
};
