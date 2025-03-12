import styles from './ChooseTime.module.css';
import { useEffect, useState } from 'react';

export const ChooseTime = () => {
    const [hours, setHours] = useState(2);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && event.target instanceof Element && !event.target.closest(`.${styles.modulesControlsItem}`)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isOpen]);

    const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setIsOpen(false);
        }
    }
    
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    }

    return (
        <div className={styles.modulesControlsItem}>
            {!isOpen && (
                <div className={styles.modulesControlsItemLabel} onClick={handleClick}>
                    на {hours} часа
                </div>
            )}

            {isOpen && (
                <input
                    type="number"
                    value={hours.toString()}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className={styles.modulesControlsItemInput}
                    onKeyDown={enterHandler}
                />
            )}
        </div>
    );
};
