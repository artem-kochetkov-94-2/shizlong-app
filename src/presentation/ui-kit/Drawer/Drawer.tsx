import React from 'react';
import styles from "./Drawer.module.css";

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  header: React.ReactNode;
  drawerContent?: React.ReactNode;
  headerClassName?: string;
  drawerContentClassName?: string;
}

export const Drawer = ({ header, drawerContent, headerClassName, drawerContentClassName, ...divProps }: DrawerProps) => {
  return (
    <div {...divProps} className={styles.wrapper}>
      <div className={styles.overlay} />
      <div className={`${styles.header} ${headerClassName}`}>{header}</div>
      {drawerContent && <div className={`${styles.content} ${drawerContentClassName}`}>{drawerContent}</div>}
    </div>
  );
};

