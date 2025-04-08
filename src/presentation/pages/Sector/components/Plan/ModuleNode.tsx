import { bookStore } from "@src/application/store/bookStore";
import { SERVER_URL } from "@src/const";
import { RawModule } from "@src/infrastructure/Locations/types";
import cn from 'classnames';
import styles from './ModuleNode.module.css';
import { useNavigate } from "react-router-dom";
import { Routes } from "@src/routes";

const isModuleAvailable = (module: RawModule, date: Date, hours: number, startTime: string) => {
    const bookingDate = new Date(date);
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const bookingStartTime = new Date(bookingDate.setHours(startHour, startMinute, 0, 0));
    const bookingEndTime = new Date(bookingStartTime.getTime() + hours * 60 * 60 * 1000);

    console.log('date', date);
    console.log('bookingStartTime', bookingStartTime);
    console.log('bookingEndTime', bookingEndTime);

    return module.slots.some(slot => {
        if (slot.is_busy) return false;

        const slotStartTime = new Date(slot.start_hour);
        const slotEndTime = new Date(slot.end_hour);

        return bookingStartTime >= slotStartTime && bookingEndTime <= slotEndTime;
    });
};

// const isModuleAvailable = (module: RawModule, date: Date, hours: number, startTime: string): boolean => {
//     console.log('date', date);
//     // Преобразуем startTime и hours в Date объекты
//     const [startHour, startMinute] = startTime.split(':').map(Number);
//     const startDateTime = new Date(date);
//     startDateTime.setHours(startHour, startMinute, 0, 0);

//     const endDateTime = new Date(startDateTime);
//     endDateTime.setHours(endDateTime.getHours() + hours);

//     // Проверяем каждый слот
//     for (const slot of module.slots) {
//         if (slot.is_busy) {
//             const slotStart = new Date(slot.start_hour);
//             const slotEnd = new Date(slot.end_hour);

//             // Проверяем пересечение времени
//             if (
//                 (startDateTime >= slotStart && startDateTime < slotEnd) ||
//                 (endDateTime > slotStart && endDateTime <= slotEnd) ||
//                 (startDateTime <= slotStart && endDateTime >= slotEnd)
//             ) {
//                 return false; // Модуль занят в это время
//             }
//         }
//     }

//     return true;
// }

const baseWidth = 16.14;

export const ModuleNode = ({ data: { module } }: { data: { module: RawModule } }) => {
    const navigate = useNavigate();
    const isAvailable = isModuleAvailable(module, bookStore.date as Date, bookStore.hours, bookStore.startTime);

    const width = Number(module.module.placed_icon.width_icon) * baseWidth;
    const height = Number(module.module.placed_icon.height_icon) * baseWidth;

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
                onClick={() => {
                    navigate(Routes.Sector.replace(':id', module.module.sector_id.toString()) + `?moduleId=${module.module.id}`);
                }}
                width={width}
                height={height}
            />
        </div>
    );
};
