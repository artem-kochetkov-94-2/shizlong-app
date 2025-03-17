import { Tab } from '@src/presentation/ui-kit/RoundedTabs';
import { makeAutoObservable } from 'mobx';
import { DateValue } from '@src/application/types/date';
import { formatShortDateWithoutYear } from '../utils/formatDate';
import { RawModule } from '@src/infrastructure/Locations/types';

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
  startTime: string = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  selectedModule: RawModule | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get endTime() {
    const [hours, minutes] = this.startTime.split(':').map(Number);
    const endDate = new Date(this.date as Date);
    endDate.setHours(hours + this.hours, minutes);

    return endDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }

  get formattedTime() {
    return `с ${this.startTime} до ${this.endTime}`;
  }

  get formattedDate() {
    return formatShortDateWithoutYear(this.date as Date);
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
}

export const bookStore = new BookStore();
