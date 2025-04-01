import { bookStore } from "@src/application/store/bookStore";
import { SERVER_URL } from "@src/const";
import { RawModule } from "@src/infrastructure/Locations/types";
import cn from 'classnames';
import styles from './ModuleNode.module.css';

const isModuleAvailable = (module: RawModule, date: Date, hours: number, startTime: string) => {
    const bookingDate = new Date(date);
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const bookingStartTime = new Date(bookingDate.setHours(startHour, startMinute, 0, 0));
    const bookingEndTime = new Date(bookingStartTime.getTime() + hours * 60 * 60 * 1000);

    return module.slots.some(slot => {
        if (slot.is_busy) return false;

        const slotStartTime = new Date(slot.start_hour);
        const slotEndTime = new Date(slot.end_hour);

        return bookingStartTime >= slotStartTime && bookingEndTime <= slotEndTime;
    });
}

export const ModuleNode = ({ data: { module } }: { data: { module: RawModule } }) => {
    const isAvailable = isModuleAvailable(module, bookStore.date as Date, bookStore.hours, bookStore.startTime);

    return (
        <div className={styles.module}>
            <span className={cn(styles.moduleId, {
                [styles.available]: isAvailable,
                [styles.booked]: !isAvailable,
            })}>
                <span>{module.module.number}</span>
            </span>
            <img
                src={`${SERVER_URL}${module.module.placed_icon.link_icon}`}
                alt={module.module.placed_icon.name_icon}
                // style={{ width, height }}
                onClick={() => bookStore.setSelectedModule(module)}
            />
        </div>
    );
};
