import { Tab } from '@src/presentation/ui-kit/RoundedTabs';
import { autorun, makeAutoObservable } from 'mobx';
import { DateValue } from '@src/application/types/date';
import {
  formatShortDateWithoutYear,
  declensionOfHours,
  getTimeRangeDurationInHoursAndMinutes,
  convertToISO,
} from '../utils/formatDate';
import { RawModule, ModuleScheme, Slot } from '@src/infrastructure/Locations/types';
import { bookingsService } from '@src/infrastructure/bookings/bookingsService';
import { RawBeachAccessory } from '@src/infrastructure/Locations/types';
import { eventService } from '../services/EventService/EventService';
import { EVENT } from '../services/EventService/EventList';
import { ApiError } from '@src/infrastructure/validateResponse';
import { PaymentStore, paymentStore } from './paymentStore';
import { BookingsStore, bookingsStore } from './bookingsStore';
import { LocationStore, locationStore } from './locationStore';
import { BookingModule, BookingRequest } from '@src/infrastructure/bookings/types';

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
];

export type SectorTab = typeof sectorTabs[number]['value'];
export type BookingsTab = typeof bookingTabs[number]['value'];

class BookStore {
  activeTab: SectorTab = 'order';
  activeBookingsTab = 'bookings';
  date: DateValue = new Date();
  isoDate: string = new Date().toISOString();
  formHours: number = 2;
  minutes: number = 0;
  formStartTime: string = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  endTime: string = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  isCreatingBooking = false;
  accessories: Record<number, {
    accessory: RawBeachAccessory;
    quantity: number;
  }> = {};
  modules: Set<number> = new Set();
  paymentStore: PaymentStore;
  bookingsStore: BookingsStore;
  locationStore: LocationStore;
  moduleSchemeId: number | null = null;

  constructor() {
    makeAutoObservable(this);
    this.paymentStore = paymentStore;
    this.bookingsStore = bookingsStore;
    this.locationStore = locationStore;

    autorun(() => {
      const formStartTime = this.formStartTime;
      const date = this.date as Date;
      const formHours = this.formHours;

      if (formStartTime && date && formHours) {
        const [startHours, minutes] = formStartTime.split(':').map(Number);
        const endDate = new Date(date as Date);
        endDate.setHours(startHours + formHours, minutes);
  
        this.endTime = endDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
      }
    });
  }

  get bookedModules() {
    return this.locationStore.modules.filter(m => this.modules.has(m.id));
  }

  get modulesPrice() {
    // @todo
    // return this.bookedModules.reduce((acc, m) => acc + (m.price_per_hour || 0) * this.hours, 0);
    return 0;
  }

  get bookPrice() {
    // @todo
    // const priceForModule = this.bookedModules.reduce((acc, m) => acc + (m.price_per_hour || 0) * this.hours, 0);
    // return priceForModule + this.modulesPrice;
    return 0;
  }

  get availablePeriodToBook() {
    const periods: ModuleScheme[] = [];
    const schemes = new Map<number, ModuleScheme>();
    const schemesCountBySchemeId = new Map<number, number>();

    this.modules.forEach((moduleId) => {
      const module = this.locationStore.modules.find((m) => m.id === moduleId);
      if (!module) return;

      module.module_schemes.forEach((scheme) => {
        if (!schemes.has(scheme.id)) {
          schemes.set(scheme.id, scheme);
        }
      });

      const availableSlots = module.slots.filter((slot) => !slot.is_busy);
      availableSlots.forEach((slot) => {
        const schemesCount = schemesCountBySchemeId.get(slot.module_scheme_id) || 0;
        schemesCountBySchemeId.set(slot.module_scheme_id, schemesCount + 1);
      });
    });

    schemesCountBySchemeId.forEach((count, schemeId) => {
      if (count === this.modules.size) {
        const scheme = schemes.get(schemeId);
        if (scheme) {
          periods.push(scheme);
        }
      }
    });

    console.log('schemesCountBySchemeId', schemesCountBySchemeId);

    return periods;
  }

  get periodsToBook() {
    const periods: ModuleScheme[] = [];
    const schemes = new Map<number, ModuleScheme>();
    const schemesCountBySchemeId = new Map<number, number>();

    this.modules.forEach((moduleId) => {
      const module = this.locationStore.modules.find((m) => m.id === moduleId);
      if (!module) return;

      module.module_schemes.forEach((scheme) => {
        if (!schemes.has(scheme.id)) {
          schemes.set(scheme.id, scheme);
        }
      });

      module.slots.forEach((slot) => {
        const schemesCount = schemesCountBySchemeId.get(slot.module_scheme_id) || 0;
        schemesCountBySchemeId.set(slot.module_scheme_id, schemesCount + 1);
      });
    });

    schemesCountBySchemeId.forEach((count, schemeId) => {
      if (count === this.modules.size) {
        const scheme = schemes.get(schemeId);
        if (scheme) {
          periods.push(scheme);
        }
      }
    });

    console.log('schemesCountBySchemeId', schemesCountBySchemeId);

    return periods;
  }

  get startDate() {
    const [hours, minutes] = this.formStartTime.split(':').map(Number);
    const startDate = new Date(this.date as Date);
    startDate.setHours(hours, minutes);

    return startDate;
  }

  get endDate() {
    const [hours, minutes] = this.formStartTime.split(':').map(Number);
    const endDate = new Date(this.date as Date);
    endDate.setHours(hours + this.formHours, minutes);

    return endDate;
  }

  get formattedDuration() {
    const { hours, minutes } = getTimeRangeDurationInHoursAndMinutes(this.startDate, this.endDate);

    return `${hours} ${declensionOfHours(hours)} ${minutes ? `${minutes} мин.` : ''}`;
  }

  get formattedTime() {
    return `с ${this.formStartTime} до ${this.endTime}`;
  }

  get formattedDate() {
    return formatShortDateWithoutYear(this.date as Date);
  }

  setModuleSchemeId(value: number) {
    this.moduleSchemeId = value;
  }

  setEndTime(value: string) {
    this.endTime = value;
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

  setActiveTab(value: SectorTab) {
    this.activeTab = value;
  }

  setActiveBookingsTab(value: BookingsTab) {
    this.activeBookingsTab = value;
  }

  setDate(value: DateValue) {
    this.date = value;
  }

  setFormHours(value: number) {
    this.formHours = value;
  }

  setStartTime(value: string) {
    this.formStartTime = value;
  }

  clear() {
    this.accessories = {};
  }

  async createBooking(onCreated: (id: number) => void) {
    try {
      this.isCreatingBooking = true;

      const modules: BookingModule[] = [];
      
      [...this.modules.keys()].forEach((moduleId) => {
        const module = this.locationStore.modules.find((m) => m.id === moduleId);

        if (!module) return;

        modules.push({
          module_id: moduleId,
          module_scheme_id: this.moduleSchemeId,
          module_scheme_date: convertToISO(this.date as Date).split('T')[0],
        });
      });

      const booking: BookingRequest = {
        modules,
        accessories: Object.values(this.accessories).map((a) => ({
          id: `${a.accessory.id}`,
          type: 'accessory',
          quantity: `${a.quantity}`,
        })),
      };

      const result = await bookingsService.createGroupBooking(booking);
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
        // @ts-ignore
        message: error.message || 'Ошибка при создании бронирования',
      });
    } finally {
      this.isCreatingBooking = false;
    }
  }

  toggleModule(module: RawModule, availableSlot: Slot | null) {
    if (this.modules.has(module.id)) {
      this.modules.delete(module.id);
    } else {
      this.modules.add(module.id);
      if (availableSlot) {
        this.moduleSchemeId = availableSlot.module_scheme_id;
      }
    }
  }
}

export const bookStore = new BookStore();
