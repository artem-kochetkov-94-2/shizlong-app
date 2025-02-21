import React from 'react';
import styles from './Tabs.module.css';

export interface Tab {
  value: string;
  label: string;
}

interface TabsProps {
  activeTab: string;
  tabs: Tab[];
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