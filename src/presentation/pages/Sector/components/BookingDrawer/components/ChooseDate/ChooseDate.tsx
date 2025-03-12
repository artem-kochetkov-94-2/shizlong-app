import { useState } from "react";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { Calendar, DateValue } from "@src/presentation/components/Calendar";
import { formatShortDate } from "@src/application/utils/formatDate";
import styles from './ChooseDate.module.css';

export const ChooseDate = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState<DateValue>(new Date());

    const onClose = () => setIsOpen(false);

    const onChange = (value: DateValue) => {
        setDate(value);
        setIsOpen(false);
    }

    const isNow = formatShortDate(date as Date) === formatShortDate(new Date());

    return (
        <>
            <div className={styles.modulesControlsItem} onClick={() => setIsOpen(true)}>
                <span>{isNow ? 'сегодня' : formatShortDate(date as Date)}</span>
                <Icon name="arrow-down" size="extra-small" />
            </div>
            {isOpen && (
                <Calendar
                    isOpen={isOpen}
                    onClose={onClose}
                    initialValue={date}
                    onChange={onChange}
                />
            )}
        </>
    );
};
