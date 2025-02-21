import { PropsWithChildren } from 'react';
import styles from './Cards.module.css';


export const Card = ({ children }: PropsWithChildren) => {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}
