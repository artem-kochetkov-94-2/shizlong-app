import { ReactNode, useState } from 'react';
import styles from './AccordionItem.module.css';
import { Icon } from '../Icon';

interface AccordionItemProps {
  title: string;
  children: ReactNode;
}

export const AccordionItem = ({ title, children }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.accordionItem} ${isOpen ? styles.expanded : ''}`}>
      <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
        {title}
        <Icon
          name={'arrow-bottom'}
          size={'extra-small'}
          className={`${styles.icon} ${isOpen ? styles.rotate : ''}`}
        />
      </button>
      <div
        className={`${styles.expandableContent} ${isOpen ? styles.open : ''}`}
      >
        {children}
      </div>
    </div>
  );
};
