import React from 'react';
import styles from './Tabs.module.css';

export interface TabItem<T extends string> {
  value: T;
  label: string;
}

interface TabsProps {
  activeTab: string;
  tabs: TabItem<string>[];
  onTabChange: (tab: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, tabs, onTabChange }) => {
  return (
    <div>
      <div className={styles.tabList}>
        {tabs.map(({ value, label}) => (
          <button
            key={value}
            className={`${styles.tabButton} ${activeTab === value ? styles.active : ''}`}
            onClick={() => onTabChange(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}; 