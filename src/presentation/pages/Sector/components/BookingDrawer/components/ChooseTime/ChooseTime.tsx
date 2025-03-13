import styles from './ChooseTime.module.css';
import { useEffect, useState } from 'react';
import { bookStore } from '@src/application/store/bookStore';
import { observer } from 'mobx-react-lite';

export const ChooseTime = observer(() => {
    const { hours } = bookStore;
    const [isOpen, setIsOpen] = useState(false);

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
                    onChange={(e) => bookStore.setHours(Number(e.target.value))}
                    className={styles.modulesControlsItemInput}
                    onKeyDown={enterHandler}
                />
            )}
        </div>
    );
});
