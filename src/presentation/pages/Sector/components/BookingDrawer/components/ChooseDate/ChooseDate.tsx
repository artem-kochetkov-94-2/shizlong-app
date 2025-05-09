import { useState } from "react";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { Calendar } from "@src/presentation/components/Calendar";
import { formatShortDate, formatShortDateWithoutYear } from "@src/application/utils/formatDate";
import styles from './ChooseDate.module.css';
import { DateValue } from "@src/application/types/date";
import { bookStore } from "@src/application/store/bookStore";
import { observer } from "mobx-react-lite";

export const ChooseDate = observer(() => {
    const { date } = bookStore;
    const [isOpen, setIsOpen] = useState(false);

    const onChange = (value: DateValue) => {
        bookStore.setDate(value);
        setIsOpen(false);
    }

    const isNow = formatShortDate(date as Date) === formatShortDate(new Date());

    return (
        <>
            <div className={styles.modulesControlsItem} onClick={() => setIsOpen(true)}>
                <span className={styles.spanText}>{isNow ? 'сегодня' : formatShortDateWithoutYear(date as Date)}</span>
                <Icon name="arrow-down" size="extra-small" />
            </div>

            {isOpen && (
                <Calendar
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    initialValue={date}
                    onChange={onChange}
                />
            )}
        </>
    );
});
