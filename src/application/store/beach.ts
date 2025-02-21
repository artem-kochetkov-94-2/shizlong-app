import { makeAutoObservable, autorun } from 'mobx';
import { RawBeach } from '@src/infrastructure/beaches/types';
import { mockCardListData } from '@src/mocks/mockCardListData';
import { Tab } from '@src/presentation/ui-kit/Tabs/Tabs';

export const beachTabs: Tab[] = [
  {
    value: 'information',
    label: 'Информация',
  },
  {
    value: 'services',
    label: 'Услуги',
  },
  {
    value: 'abonements',
    label: 'Абонементы',
  },
  {
    value: 'reviews',
    label: 'Отзывы',
  },
];

class BeachStore {
  beachId: string | null = null;
  beach: RawBeach | null = null;
  activeTab: 'information' | 'services' | 'abonements' | 'reviews' = 'information';

  constructor() {
    makeAutoObservable(this);

    autorun(() => {
      if (this.beachId) {
        this.beach = mockCardListData.find(beach => beach.id === this.beachId) || null;
      }
    });
  }

  setBeach(beachId: string) {
    this.beachId = beachId;
  }

  clearSelection() {
    this.beachId = null;
  }
}

export const beachStore = new BeachStore();
