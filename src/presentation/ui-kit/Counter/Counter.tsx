import React from 'react';
import styles from './Counter.module.css';

interface CounterProps {
    count: number;
    onChange: (count: number) => void;
}

export const Counter: React.FC<CounterProps> = ({ count, onChange }) => {
    const increment = () => onChange(count + 1);
    const decrement = () => onChange(count > 1 ? count - 1 : 1);

    return (
        <div className={styles.counter}>
            <button className={styles.counterButton} onClick={decrement}>-</button>
            <span className={styles.counterValue}>{count}</span>
            <button className={styles.counterButton} onClick={increment}>+</button>
        </div>
    );
};
