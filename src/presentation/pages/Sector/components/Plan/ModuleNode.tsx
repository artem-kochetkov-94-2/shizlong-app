import { bookStore } from '@src/application/store/bookStore';
import { RawModule, Slot } from '@src/infrastructure/Locations/types';
import cn from 'classnames';
import styles from './ModuleNode.module.css';
import { observer } from 'mobx-react-lite';

function formatToLocalString(dateString: string): Date {
  // Разбиваем строку на дату и время
  const [datePart, timePart] = dateString.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute, second] = timePart.split(':').map(Number);

  // Создаем объект Date в локальной временной зоне
  const date = new Date(year, month - 1, day, hour, minute, second);

  return date;
}

const isModuleAvailable = (
  module: RawModule,
  date: string,
  hours: number,
  startTime: string
): [boolean, Slot | null] => {
  const bookingDate = new Date(date);
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const bookingStartTime = new Date(bookingDate.setHours(startHour, startMinute, 0, 0));
  const bookingEndTime = new Date(bookingStartTime.getTime() + hours * 60 * 60 * 1000);

  // if (module.number != '52') return [false, null];
  // console.clear();
  // console.log('bookingStartTime', bookingStartTime);
  // console.log('bookingEndTime', bookingEndTime);

  const availableSlot = module.slots.find((slot) => {
    if (slot.is_busy) return false;

    const formattedSlotStartTime = formatToLocalString(slot.from);
    const formattedSlotEndTime = formatToLocalString(slot.to);

    // console.log('--------------------------------');
    // console.log('slot', JSON.parse(JSON.stringify(slot)));
    // console.log('--------------------------------');
    // console.log('formattedSlotStartTime', formattedSlotStartTime);
    // console.log('formattedSlotEndTime', formattedSlotEndTime);

    return new Date(bookingStartTime) >= new Date(formattedSlotStartTime) && new Date(bookingEndTime) <= new Date(formattedSlotEndTime);
  });

  if (availableSlot) {
    return [true, availableSlot];
  }

  return [false, null];
};

const baseWidth = 16.14;

export const ModuleNode = observer(({ data: { module } }: { data: { module: RawModule } }) => {
  const { modules } = bookStore;
  const [isAvailable, availableSlot] = isModuleAvailable(
    module,
    bookStore.date,
    bookStore.formHours,
    bookStore.formStartTime
  );

  const width = Number(module.placed_icon?.width_icon) * baseWidth;
  const height = Number(module.placed_icon?.height_icon) * baseWidth;
  const fontSize = height * 0.3;

  return (
    <div className={styles.module}>
      <span
        className={cn(styles.moduleId, {
          [styles.available]: isAvailable,
          [styles.booked]: !isAvailable,
        })}
      >
        <span
          style={{
            minWidth: width * 0.8,
            minHeight: `${fontSize}px`,
            fontSize: `${fontSize}px`,
          }}
          onClick={() => bookStore.toggleModule(module, availableSlot)}
        >
          {module.number}
        </span>
      </span>
      <img
        src={module.placed_icon?.link_icon}
        alt={module.placed_icon?.name_icon}
        onClick={() => bookStore.toggleModule(module, availableSlot)}
        width={width}
        height={height}
        className={cn({
          [styles.activeModule]: modules.has(module.id),
        })}
      />
    </div>
  );
});
