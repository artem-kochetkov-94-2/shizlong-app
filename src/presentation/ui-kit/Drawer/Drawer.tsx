import React, { useState } from 'react';
import classNames from 'classnames';
import styles from "./Drawer.module.css";

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  header: React.ReactNode;
  drawerContent?: React.ReactNode;
  footer?: React.ReactNode;
  headerClassName?: string;
  drawerContentClassName?: string;
  drawerFooterClassName?: string;
  isOpen?: boolean;
  height?: number;
}

export const Drawer = ({
    header,
    drawerContent,
    footer,
    headerClassName,
    drawerContentClassName,
    drawerFooterClassName,
    isOpen = false,
    height,
    ...divProps
}: DrawerProps) => {
  const [open, setOpen] = useState(true);

  return (
    <div
      {...divProps}
      className={classNames(styles.wrapper, {
        [styles.withFooter]: footer,
        [styles.open]: open
      })}
      style={height ? { top: `calc(100% - ${height}px)` } : {}}
    >
      <div className={styles.overlay} onClick={() => setOpen(false)} />
      <div className={classNames(styles.header, headerClassName)}>
        {header}
        <div className={styles.divider} onClick={() => setOpen(!open)} />
      </div>
      {drawerContent && <div className={classNames(styles.content, drawerContentClassName)}>{drawerContent}</div>}
      {footer && <div className={classNames(styles.footer, drawerFooterClassName)}>{footer}</div>}
    </div>
  );
};

