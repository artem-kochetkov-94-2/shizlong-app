import { PropsWithChildren } from 'react';
import styles from './Cards.module.css';
import classNames from 'classnames';

export const Card = ({
    children,
    className,
    onClick,
    boxShadow = false
}: PropsWithChildren<{ className?: string, onClick?: () => void, boxShadow?: boolean }>) => {
    return (
        <div
            className={classNames(styles.wrapper, { [styles.shadow]: boxShadow }, className)}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
