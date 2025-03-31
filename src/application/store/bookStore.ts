import { Tab } from '@src/presentation/ui-kit/RoundedTabs';
import { makeAutoObservable } from 'mobx';
import { DateValue } from '@src/application/types/date';
import {
  formatShortDateWithoutYear,
  declensionOfHours,
  getTimeRangeDurationInHoursAndMinutes,
  convertToISO,
} from '../utils/formatDate';
import { RawModule } from '@src/infrastructure/Locations/types';
import { bookingsService } from '@src/infrastructure/bookings/bookingsService';
import { RawBeachAccessory } from '@src/infrastructure/Locations/types';
import { eventService } from '../services/EventService/EventService';
import { EVENT } from '../services/EventService/EventList';
import { ApiError } from '@src/infrastructure/validateResponse';
import { PaymentStore, paymentStore } from './paymentStore';
import { BookingsStore, bookingsStore } from './bookingsStore';

export const modulesSelectOptions = [
  {
    value: 'one',
    label: 'один модуль',
  },
  {
    value: 'group',
    label: 'группу модулей',
  },
];

export const sectorTabs: Tab[] = [
  {
    value: 'bookings',
    label: 'Мои брони',
  },
  {
    value: 'order',
    label: 'Заказать',
  },
];

export const bookingTabs: Tab[] = [
  {
    value: 'bookings',
    label: 'Мои брони',
  },
  {
    value: 'abonements',
    label: 'Абонемент',
  },
  {
    value: 'locations',
    label: 'Пляжи рядом',
  },
];

export type SectorTab = typeof sectorTabs[number]['value'];
export type BookingsTab = typeof bookingTabs[number]['value'];

export type ModulesSelectValue = typeof modulesSelectOptions[number]['value'];

class BookStore {
  modulesSelectValue: ModulesSelectValue = 'one';
  activeTab: SectorTab = 'order';
  activeBookingsTab = 'bookings';
  date: DateValue = new Date();
  hours: number = 2;
  minutes: number = 0;
  startTime: string = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  selectedModule: RawModule | null = null;
  isCreatingBooking = false;
  accessories: Record<number, {
    accessory: RawBeachAccessory;
    quantity: number;
  }> = {};
  paymentStore: PaymentStore;
  bookingsStore: BookingsStore;

  constructor() {
    makeAutoObservable(this);
    this.paymentStore = paymentStore;
    this.bookingsStore = bookingsStore;
  }

  get startDate() {
    const [hours, minutes] = this.startTime.split(':').map(Number);
    const startDate = new Date(this.date as Date);
    startDate.setHours(hours, minutes);

    return startDate;
  }

  get endDate() {
    const [hours, minutes] = this.startTime.split(':').map(Number);
    const endDate = new Date(this.date as Date);
    endDate.setHours(hours + this.hours, minutes);

    return endDate;
  }

  get endTime() {
    const [hours, minutes] = this.startTime.split(':').map(Number);
    const endDate = new Date(this.date as Date);
    endDate.setHours(hours + this.hours, minutes);

    return endDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }

  get formattedDuration() {
    const { hours, minutes } = getTimeRangeDurationInHoursAndMinutes(this.startDate, this.endDate);

    return `${hours} ${declensionOfHours(hours)} ${minutes ? `${minutes} мин.` : ''}`;
  }

  get formattedTime() {
    return `с ${this.startTime} до ${this.endTime}`;
  }

  get formattedDate() {
    return formatShortDateWithoutYear(this.date as Date);
  }

  toggleAccessory(accessory: RawBeachAccessory, isActive: boolean) {
    if (isActive) {
      this.accessories[accessory.id] = {
        accessory,
        quantity: 1,
      };
    } else {
      delete this.accessories[accessory.id];
    }
  }

  setAccessoryQuantity(accessoryId: number, quantity: number) {
    this.accessories[accessoryId].quantity = quantity;
  }

  setModulesSelectValue(value: ModulesSelectValue) {
    this.modulesSelectValue = value;
  }

  setActiveTab(value: SectorTab) {
    this.activeTab = value;
  }

  setActiveBookingsTab(value: BookingsTab) {
    this.activeBookingsTab = value;
  }

  setDate(value: DateValue) {
    this.date = value;
  }

  setHours(value: number) {
    this.hours = value;
  }

  setStartTime(value: string) {
    this.startTime = value;
  }

  setSelectedModule(module: RawModule | null) {
    this.selectedModule = module;
  }

  async createBooking(onCreated: (id: number) => void) {
    if (!this.selectedModule) return;

    try {
      this.isCreatingBooking = true;

      const booking = {
        module_id: this.selectedModule.module.id,
        start_time: convertToISO(this.startDate),
        end_time: convertToISO(this.endDate),
        timeZone: 'Asia/Yekaterinburg',
        accessories: Object.values(this.accessories).map((a) => ({
          id: `${a.accessory.id}`,
          type: 'accessory',
          quantity: `${a.quantity}`,
        })),
      }

      const result = await bookingsService.createBooking(booking);
      await bookingsStore.getMyBookings();
      onCreated(result.id);
      this.paymentStore.processPayment(result.id);
    } catch (error) {
      console.log('createBooking error', error);
      if (error instanceof ApiError) {
        eventService.emit(EVENT.MODAL_ERROR, {
          isActive: true,
          message: error.message,
        });
      }
      eventService.emit(EVENT.MODAL_ERROR, {
        isActive: true,
        // @todo
        // @ts-ignore
        message: error.message || 'Ошибка при создании бронирования',
      });
    } finally {
      this.isCreatingBooking = false;
    }
  }
}

export const bookStore = new BookStore();
