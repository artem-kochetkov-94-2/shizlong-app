import React, { useState } from 'react';
import styles from './Toggle.module.css';
import cn from 'classnames';

interface ToggleProps {
  initialState?: boolean;
  onToggle?: (state: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ initialState = false, onToggle }) => {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div className={cn(styles.toggle, isOn && styles.on)} onClick={handleToggle}>
      <div className={cn(styles.slider, isOn && styles.on)}></div>
    </div>
  );
};

export default Toggle; 