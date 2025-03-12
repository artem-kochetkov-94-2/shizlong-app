import { Tab } from '@src/presentation/ui-kit/RoundedTabs';
import { makeAutoObservable } from 'mobx';

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

  constructor() {
    makeAutoObservable(this);
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
}

export const bookStore = new BookStore();
