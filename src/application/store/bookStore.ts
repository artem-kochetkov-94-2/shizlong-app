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
import { SectorStore, sectorStore } from './sectorStore';
import { roundMinutesUpToNearestQuarter } from '../utils/roundMinutesUpToNearestQuarter';

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

interface ActiveHourlyPeriod {
  type: 'hourly';
  hours: number;
}

interface ActiveRangePeriod {
  type: 'period';
  startTime: string;
  endTime: string;
}

type ActivePeriod = ActiveHourlyPeriod | ActiveRangePeriod;

const isActiveRangePeriod = (period: ActivePeriod | null): period is ActiveRangePeriod => {
  return period?.type === 'period';
}

const isActiveHourlyPeriod = (period: ActivePeriod | null): period is ActiveHourlyPeriod => {
  return period?.type === 'hourly';
}

class BookStore {
  activeTab: SectorTab = 'order';
  activeBookingsTab = 'bookings';

  date: DateValue = new Date();
  isoDate: string = new Date().toISOString();

  formHours: number = 2;
  minutes: number = 0;

  formStartTime: string = roundMinutesUpToNearestQuarter(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));
  endTime: string = roundMinutesUpToNearestQuarter(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));

  isCreatingBooking = false;

  accessories: Record<number, {
    accessory: RawBeachAccessory;
    quantity: number;
  }> = {};
  bookModules: Map<number, RawModule> = new Map();

  moduleSchemePeriod: ActivePeriod | null = null;

  paymentStore: PaymentStore;
  bookingsStore: BookingsStore;
  locationStore: LocationStore;
  sectorStore: SectorStore;

  constructor() {
    makeAutoObservable(this);
    this.paymentStore = paymentStore;
    this.bookingsStore = bookingsStore;
    this.locationStore = locationStore;
    this.sectorStore = sectorStore;

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

  get activeSchemeModules() {
    return this.locationStore.modules.filter((m) => m.sector_scheme_id === this.sectorStore.activeScheme?.id);
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

  get allPeriods() {
    const schemes: [string, string][] = [];

    this.activeSchemeModules.forEach((module) => {
      module.module_schemes?.forEach((scheme) => {
        if (scheme.type.name === 'hourly') return;

        if (!schemes.find((period) => period[0] === scheme.start_time && period[1] === scheme.end_time)) {
          schemes.push([scheme.start_time, scheme.end_time]);
        }
      });
    });

    return schemes;
  }

  get largestPeriod(): [string, string] | null {
    let largestPeriod: [string, string] | [] = [];

    this.allPeriods.forEach((period) => {
      const [start, end] = period;
      const currentStartHours = Number(start.split(':')[0]);
      const currentEndHours = Number(end.split(':')[0]);
      const currentDuration = currentEndHours - currentStartHours;

      const largestStartHours = Number(largestPeriod[0]?.split(':')[0]) || 0;
      const largestEndHours = Number(largestPeriod[1]?.split(':')[0]) || 0;
      const largestDuration = largestEndHours - largestStartHours;

      if (currentDuration > largestDuration) {
        largestPeriod = [start, end];
      }
    });

    return largestPeriod.length > 0 ? largestPeriod : null;
  }

  get hourlyPeriods() {
    const discreteness = new Set<number>();

    this.activeSchemeModules.forEach((module) => {
      module.module_schemes?.forEach((scheme) => {
        if (scheme.type.name === 'hourly') {
          for (let i = 0; i < scheme.discreteness_steps; i++) {
            discreteness.add(scheme.discreteness * i + scheme.discreteness);
          }
        }
      });
    });

    return Array.from(discreteness).sort((a, b) => a - b);
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

  get activePeriod() {
    if (isActiveHourlyPeriod(this.moduleSchemePeriod)) {
      return this.moduleSchemePeriod.hours;
    }

    if (isActiveRangePeriod(this.moduleSchemePeriod)) {
      return [this.moduleSchemePeriod.startTime, this.moduleSchemePeriod.endTime].toString();
    }

    return '';
  }

  getAvailableSlot = (module: RawModule): Slot | null => {
    const bookingDate = new Date(this.date as Date);
    const [startHour, startMinute] = this.formStartTime.split(':').map(Number);
    const bookingStartTime = new Date(bookingDate.setHours(startHour, startMinute, 0, 0));
    const bookingEndTime = new Date(bookingStartTime.getTime() + this.formHours * 60 * 60 * 1000);

    const availableSlot = module.slots.find((slot) => {
      if (slot.is_busy) return false;
      if (module.module_schemes?.find((scheme) => scheme.id === slot.module_scheme_id)?.type.name !== 'hourly') return false;
  
      const formattedSlotStartTime = formatToLocalString(slot.from);
      const formattedSlotEndTime = formatToLocalString(slot.to);
  
      return new Date(bookingStartTime) >= new Date(formattedSlotStartTime) && new Date(bookingEndTime) <= new Date(formattedSlotEndTime);
    });

    return availableSlot || null;
  }

  isModuleAvailableForHourlySchemes = (module: RawModule): boolean => {
    const availableSlot = this.getAvailableSlot(module);
    const moduleScheme = this.getScheme(module);
    if (moduleScheme?.is_active === false) return false;

    if (this.bookModules.size > 1) {
      const firstBookModule = this.bookModules.values().next().value!;
      const firstBookModuleScheme = this.getScheme(firstBookModule);

      if (firstBookModuleScheme?.discreteness !== moduleScheme?.discreteness) {
        return false;
      }
    }

    if (availableSlot) {
      return true;
    }
  
    return false;
  }

  isModuleAvailableForPeriodSchemes = (module: RawModule): boolean => {
    const moduleSchemePeriod = this.moduleSchemePeriod;
    if (!isActiveRangePeriod(moduleSchemePeriod)) return false;

    const availableSlot = module.slots.find((slot) => {
      if (slot.is_busy) return false;

      const slotFromTime = slot.from.split(' ')[1];
      const slotToTime = slot.to.split(' ')[1];

      if (slotFromTime !== moduleSchemePeriod!.startTime || slotToTime !== moduleSchemePeriod!.endTime) return false;
      if (module.module_schemes?.find((scheme) => scheme.id === slot.module_scheme_id)?.type.name === 'hourly') return false;
  
      return true;
    });

    if (!availableSlot) return false;

    const scheme = this.getScheme(module);
    if (!scheme) return false;

    return scheme.is_active;
  }

  isModuleAvailable = (module: RawModule): boolean => {
    if (isActiveHourlyPeriod(this.moduleSchemePeriod)) {
      return this.isModuleAvailableForHourlySchemes(module);
    };

    if (isActiveRangePeriod(this.moduleSchemePeriod)) {
      return this.isModuleAvailableForPeriodSchemes(module);
    }

    return false;
  };

  getSchemeByPeriod = (module: RawModule): ModuleScheme | null => {
    const moduleSchemePeriod = this.moduleSchemePeriod;
    if (!isActiveRangePeriod(moduleSchemePeriod)) return null;

    const findedPeriod = module.module_schemes?.find((scheme) => {
      return scheme.start_time === moduleSchemePeriod.startTime && scheme.end_time === moduleSchemePeriod.endTime;
    });

    return findedPeriod || null;
  }

  getSchemeByHourly = (module: RawModule): ModuleScheme | null => {
    const moduleSchemePeriod = this.moduleSchemePeriod;
    if (!isActiveHourlyPeriod(moduleSchemePeriod)) return null;

    const availableSlot = this.getAvailableSlot(module);

    if (availableSlot) {
      return module.module_schemes?.find((scheme) => scheme.id === availableSlot.module_scheme_id) || null;
    }

    return null;
  }

  getScheme = (module: RawModule): ModuleScheme | null => {
    if (isActiveHourlyPeriod(this.moduleSchemePeriod)) {
      return this.getSchemeByHourly(module);
    }

    if (isActiveRangePeriod(this.moduleSchemePeriod)) {
      return this.getSchemeByPeriod(module);
    }

    return null;
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

  setPeriod(period: ActivePeriod | null) {
    if (period === null) {
      this.moduleSchemePeriod = null;
      return;
    }

    if (isActiveRangePeriod(period)) {
      const startTime = period.startTime.split(':').slice(0, 2).join(':');
      const endTime = period.endTime.split(':').slice(0, 2).join(':');
      const hours = Number(endTime.split(':')[0]) - Number(startTime.split(':')[0]);

      this.setStartTime(startTime);
      this.setEndTime(endTime);
      this.setFormHours(hours);
    }

    const moduleSchemePeriod = this.moduleSchemePeriod;
    if (isActiveHourlyPeriod(period)) {
      if (isActiveRangePeriod(moduleSchemePeriod)) {
        this.setStartTime(roundMinutesUpToNearestQuarter(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })));
      }
      this.setFormHours(period.hours);
    }

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
      const moduleSchemePeriod = this.moduleSchemePeriod;
      const modules: BookingModule[] = [];
     
      this.bookModules.forEach((module) => {
        if (isActiveRangePeriod(moduleSchemePeriod)) {
          const moduleScheme = this.getScheme(module);
          modules.push({
            module_id: module.id,
            module_scheme_id: moduleScheme?.id!,
            module_scheme_date: convertToISO(this.date as Date).split('T')[0],
          });
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

      const result = await bookingsService.createGroupBooking(booking);
      onCreated(result.id);
      this.paymentStore.processPayment(result.id);
    } catch (error) {
      console.log('createBooking error', error);
      if (error instanceof ApiError) {
        eventService.emit(EVENT.MODAL_ERROR, {
          isActive: true,
          message: error.message,
        });
        return;
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
