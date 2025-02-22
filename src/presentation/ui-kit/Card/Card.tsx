import { PropsWithChildren } from 'react';
import styles from './Cards.module.css';


export const Card = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
    return (
        <div className={`${styles.wrapper} ${className}`}>
            {children}
        </div>
    )
}
