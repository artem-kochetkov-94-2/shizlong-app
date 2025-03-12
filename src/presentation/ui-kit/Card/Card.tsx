import { PropsWithChildren } from 'react';
import styles from './Cards.module.css';


export const Card = ({ children, className, onClick }: PropsWithChildren<{ className?: string, onClick?: () => void }>) => {
    return (
        <div className={`${styles.wrapper} ${className}`} onClick={onClick}>
            {children}
        </div>
    )
}
