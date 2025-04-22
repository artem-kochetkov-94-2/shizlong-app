import { Tab } from '@src/presentation/ui-kit/RoundedTabs';
import { autorun, makeAutoObservable, reaction, runInAction } from 'mobx';
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

function formatToLocalString(dateString: string): Date {
  // Разбиваем строку на дату и время
  const [datePart, timePart] = dateString.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute, second] = timePart.split(':').map(Number);

  // Создаем объект Date в локальной временной зоне
  const date = new Date(year, month - 1, day, hour, minute, second);

  return date;
}

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
  bookModules: Map<number, RawModule> = new Map();
  paymentStore: PaymentStore;
  bookingsStore: BookingsStore;
  locationStore: LocationStore;
  moduleSchemePeriod: [string, string] | null = null;

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
  
        runInAction(() => {
          this.endTime = endDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        });
      }
    });

    reaction(
      () => this.locationStore.modules,
      (modules) => {
        const newBookModules = new Map<number, RawModule>();

        this.bookModules.forEach((bookModule) => {
          const locationModule = modules.find((m) => m.id === bookModule.id);
          if (!locationModule) return;

          newBookModules.set(bookModule.id, locationModule);
        });

        runInAction(() => {
          this.bookModules = newBookModules;
        });
        this.checkModules();
    });
  }

  get bookedModules() {
    return this.locationStore.modules.filter(m => this.bookModules.has(m.id));
  }

  get modulesPrice() {
    let acc = 0;

    this.bookModules.forEach((module) => {
      const moduleScheme = this.getScheme(module);

      if (moduleScheme?.type.name === 'hourly') {
        acc += (moduleScheme.price.value || 0) * this.formHours;
        return acc;
      }

      if (moduleScheme) {
        acc += (moduleScheme.price.value || 0);
      }
    });

    return acc;
  }

  get bookPrice() {
    const priceForAcessories = Object.values(this.accessories).reduce((acc, accessory) => acc + (accessory.accessory.price.value || 0) * accessory.quantity, 0);
    return this.modulesPrice + priceForAcessories;
  }

  // доступные слоты для бронирования
  // get availablePeriodToBook() {
  //   const periods: ModuleScheme[] = [];
  //   const schemes = new Map<number, ModuleScheme>();
  //   const schemesCountBySchemeId = new Map<number, number>();

  //   this.bookModules.forEach((module) => {
  //     module.module_schemes.forEach((scheme) => {
  //       if (!schemes.has(scheme.id)) {
  //         schemes.set(scheme.id, scheme);
  //       }
  //     });

  //     const availableSlots = module.slots.filter((slot) => !slot.is_busy);
  //     availableSlots.forEach((slot) => {
  //       const schemesCount = schemesCountBySchemeId.get(slot.module_scheme_id) || 0;
  //       schemesCountBySchemeId.set(slot.module_scheme_id, schemesCount + 1);
  //     });
  //   });

  //   schemesCountBySchemeId.forEach((count, schemeId) => {
  //     if (count === this.bookModules.size) {
  //       const scheme = schemes.get(schemeId);
  //       if (scheme) {
  //         periods.push(scheme);
  //       }
  //     }
  //   });

  //   return periods;
  // }

  get allPeriods() {
    const schemes: [string, string][] = [];

    this.locationStore.modules.forEach((module) => {
      module.module_schemes.forEach((scheme) => {
        if (scheme.type.name === 'hourly') return;

        if (!schemes.find((period) => period[0] === scheme.start_time && period[1] === scheme.end_time)) {
          schemes.push([scheme.start_time, scheme.end_time]);
        }
      });
    });

    return schemes;
  }

  // все периоды схемы сами
  // get periodsToBook() {
  //   const periods: ModuleScheme[] = [];
  //   const schemes = new Map<number, ModuleScheme>();
  //   const schemesCountBySchemeId = new Map<number, number>();

  //   this.bookModules.forEach((module) => {
  //     module.module_schemes.forEach((scheme) => {
  //       if (!schemes.has(scheme.id)) {
  //         schemes.set(scheme.id, scheme);
  //       }
  //     });

  //     module.slots.forEach((slot) => {
  //       const schemesCount = schemesCountBySchemeId.get(slot.module_scheme_id) || 0;
  //       schemesCountBySchemeId.set(slot.module_scheme_id, schemesCount + 1);
  //     });
  //   });

  //   schemesCountBySchemeId.forEach((count, schemeId) => {
  //     if (count === this.bookModules.size) {
  //       const scheme = schemes.get(schemeId);
  //       if (scheme) {
  //         periods.push(scheme);
  //       }
  //     }
  //   });

  //   console.log('schemesCountBySchemeId', schemesCountBySchemeId);

  //   return periods.sort((a, b) => {
  //     return Number(a.start_time.split(':')[0]) - Number(b.start_time.split(':')[0]);
  //   });
  // }

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

  getNamePeriod = (period: [string, string]): string => {
    const module = this.locationStore.modules.find((module) => {
      return module.module_schemes.find((scheme) => scheme.start_time === period[0] && scheme.end_time === period[1]);
    });

    return module?.module_schemes.find((scheme) => scheme.start_time === period[0] && scheme.end_time === period[1])?.name || '';
  }

  getAvailableSlot = (module: RawModule): Slot | null => {
    const bookingDate = new Date(this.date as Date);
    const [startHour, startMinute] = this.formStartTime.split(':').map(Number);
    const bookingStartTime = new Date(bookingDate.setHours(startHour, startMinute, 0, 0));
    const bookingEndTime = new Date(bookingStartTime.getTime() + this.formHours * 60 * 60 * 1000);
  
    const availableSlot = module.slots.find((slot) => {
      if (slot.is_busy) return false;
      if (module.module_schemes.find((scheme) => scheme.id === slot.module_scheme_id)?.type.name !== 'hourly') return false;
  
      const formattedSlotStartTime = formatToLocalString(slot.from);
      const formattedSlotEndTime = formatToLocalString(slot.to);
  
      return new Date(bookingStartTime) >= new Date(formattedSlotStartTime) && new Date(bookingEndTime) <= new Date(formattedSlotEndTime);
    });

    return availableSlot || null;
  }

  isModuleAvailableForHourlySchemes = (module: RawModule): boolean => {
    const availableSlot = this.getAvailableSlot(module);

    if (availableSlot) {
      return true;
    }
  
    return false;
  }

  isModuleAvailableForPeriodSchemes = (module: RawModule): boolean => {
    if (!this.moduleSchemePeriod) return false;

    const availableSlot = module.slots.find((slot) => {
      if (slot.is_busy) return false;

      const slotFromTime = slot.from.split(' ')[1];
      const slotToTime = slot.to.split(' ')[1];

      if (slotFromTime !== this.moduleSchemePeriod![0] || slotToTime !== this.moduleSchemePeriod![1]) return false;
      if (module.module_schemes.find((scheme) => scheme.id === slot.module_scheme_id)?.type.name === 'hourly') return false;
  
      return true;
    });

    if (availableSlot) {
      return true;
    }

    return false;
  }

  isModuleAvailable = (module: RawModule): boolean => {
    if (this.moduleSchemePeriod === null) {
      return this.isModuleAvailableForHourlySchemes(module);
    };

    return this.isModuleAvailableForPeriodSchemes(module);
  };

  isActivePeriod = (period: [string, string]): boolean => {
    if (this.moduleSchemePeriod !== null) {
      return period[0] === this.moduleSchemePeriod![0] && period[1] === this.moduleSchemePeriod![1];
    }

    return false;
  }

  getSchemeByPeriod = (module: RawModule): ModuleScheme | null => {
    if (!this.moduleSchemePeriod) return null;

    const findedPeriod = module.module_schemes.find((scheme) => {
      return scheme.start_time === this.moduleSchemePeriod![0] && scheme.end_time === this.moduleSchemePeriod![1];
    });

    return findedPeriod || null;
  }

  getSchemeByHourly = (module: RawModule): ModuleScheme | null => {
    const availableSlot = this.getAvailableSlot(module);

    if (availableSlot) {
      return module.module_schemes.find((scheme) => scheme.id === availableSlot.module_scheme_id) || null;
    }

    return null;
  }

  getScheme = (module: RawModule): ModuleScheme | null => {
    if (this.moduleSchemePeriod === null) {
      return this.getSchemeByHourly(module);
    }

    return this.getSchemeByPeriod(module);
  }

  checkModules() {
    const newModules = new Map<number, RawModule>();

    this.bookModules.forEach((module) => {
      const isAvailable = this.isModuleAvailable(module);
      if (isAvailable) {
        newModules.set(module.id, module);
      } else {
        newModules.delete(module.id);
      }
    });

    runInAction(() => {
      this.bookModules = newModules;
    });
  }

  setPeriod(period: [string, string] | null) {
    if (period === null) {
      this.moduleSchemePeriod = null;
      return;
    }

    const startTime = period[0].split(':').slice(0, 2).join(':');
    const endTime = period[1].split(':').slice(0, 2).join(':');
    const hours = Number(endTime.split(':')[0]) - Number(startTime.split(':')[0]);

    bookStore.setStartTime(startTime);
    bookStore.setEndTime(endTime);
    bookStore.setFormHours(hours);

    this.moduleSchemePeriod = period;
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
    this.bookModules.clear();
    this.moduleSchemePeriod = null;
  }

  async createBooking(onCreated: (id: number) => void) {
    try {
      this.isCreatingBooking = true;

      const modules: BookingModule[] = [];
      
      this.bookModules.forEach((module) => {
        if (this.moduleSchemePeriod) {
          const moduleScheme = this.getScheme(module);

          if (moduleScheme) {
            modules.push({
              module_id: module.id,
              module_scheme_id: moduleScheme.id,
              module_scheme_date: convertToISO(this.date as Date).split('T')[0],
            });
          }
        } else {
          modules.push({
            module_id: module.id,
            start_time: convertToISO(this.date as Date).split('T')[0] + 'T' + this.formStartTime,
            end_time: convertToISO(this.date as Date).split('T')[0] + 'T' + this.endTime,
          });
        }
      });

      const booking: BookingRequest = {
        modules,
        accessories: Object.values(this.accessories).map((a) => ({
          id: `${a.accessory.id}`,
          type: 'accessory',
          quantity: `${a.quantity}`,
        })),
      };

      console.log('BookingRequest', JSON.parse(JSON.stringify(booking)));

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

  toggleModule(module: RawModule) {
    if (this.bookModules.has(module.id)) {
      this.bookModules.delete(module.id);
    } else {
      this.bookModules.set(module.id, module);
    }
  }
}

export const bookStore = new BookStore();
