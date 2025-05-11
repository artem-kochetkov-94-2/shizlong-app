import React, { ReactNode, useState } from 'react';
import styles from './Toggle.module.css';
import cn from 'classnames';

interface ToggleProps {
  initialState?: boolean;
  onToggle?: (state: boolean) => void;
  label: ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({ initialState = false, onToggle, label }) => {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div className={styles.toggleWrapper}>
      <div className={cn(styles.toggle, isOn && styles.on)} onClick={handleToggle}>
        <div className={cn(styles.slider, isOn && styles.on)}></div>
      </div>

      {label && <div className={styles.toggleLabel}>{label}</div>}
    </div>
  );
};

export default Toggle;
