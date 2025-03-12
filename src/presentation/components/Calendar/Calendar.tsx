import { IconButton } from "@src/presentation/ui-kit/IconButton"
import styles from "./Calendar.module.css";
import { Button } from "@src/presentation/ui-kit/Button";
import { useState } from "react";
import { Calendar as CalendarComponent } from "react-calendar";
import { Sheet } from 'react-modal-sheet';
import { formatFullDate } from "@src/application/utils/formatDate";

type ValuePiece = Date | null;
export type DateValue = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarProps {
    isOpen: boolean;
    onClose: () => void;
    initialValue?: DateValue;
    onChange: (value: DateValue) => void;
}

export const Calendar = ({ isOpen, onClose, initialValue, onChange }: CalendarProps) => {
    const [value, setValue] = useState<DateValue>(initialValue || new Date());

    if (!isOpen) return null;

    return (
        <Sheet
            isOpen={isOpen}
            onClose={() => onClose()}
            detent="content-height"
        >
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <div className={styles.calendar}>
                        <div className={styles.calendarHeader}>
                            <div className={styles.calendarHeaderLeft}>
                                <div className={styles.calendarHeaderTitle}>Выберите день</div>
                                <div className={styles.calendarHeaderDate}>{initialValue ? formatFullDate(initialValue as Date) : ''}</div>
                            </div>
                            <IconButton
                                iconName="cross"
                                size="large"
                                shape="rounded"
                                className={styles.calendarHeaderClose}
                                color="gray"
                                withShadow={false}
                                onClick={onClose}
                            />
                        </div>

                        <div className={styles.calendarBody}>
                            <CalendarComponent
                                onChange={setValue}
                                value={value}
                                prevLabel={
                                    <IconButton
                                        iconName="arrow-left"
                                        size="large"
                                        shape="rounded"
                                        color="white"
                                        className={styles.calendarHeaderPrev}
                                    />
                                }
                                nextLabel={
                                    <IconButton
                                        iconName="arrow-right"
                                        size="large"
                                        shape="rounded"
                                        color="white"
                                        className={styles.calendarHeaderNext}
                                    />
                                }
                                prev2Label={null}
                                next2Label={null}
                                minDate={new Date()}
                                maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                            />
                        </div>

                        <div className={styles.calendarFooter}>
                            <Button
                                size="medium"
                                variant="yellow"
                                onClick={() => onChange(value)}
                            >
                                Выбрать
                            </Button>
                            <Button size="medium" variant="tertiary" onClick={onClose}>Отмена</Button>
                        </div>
                    </div>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
    );
}
