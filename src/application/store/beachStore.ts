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

  get services() {
    return [
      {
        name: 'Одиночный шезлонг пластиковый',
        icon: 'https://placehold.co/24x24',
        extraTitle: '600 ₽',
        extraDescription: 'за 1 час',
      },
      {
        name: 'Одиночный шезлонг деревянный',
        icon: 'https://placehold.co/24x24',
        extraTitle: '900 ₽',
        extraDescription: 'за 1 час',
      },
      {
        name: '2 шезлонга с зонтиком',
        icon: 'https://placehold.co/24x24',
        extraTitle: '1 800 ₽',
        extraDescription: 'за 3 часа',
      },
      {
        name: 'Качеля',
        icon: 'https://placehold.co/24x24',
        extraTitle: '1 200 ₽',
        extraDescription: 'за 1 час',
      },
      {
        name: 'Ракушка',
        icon: 'https://placehold.co/24x24',
        extraTitle: '9 800 ₽',
        extraDescription: 'за 3 часа',
      },
      {
        name: 'Одиночный шезлонг пластиковый 2',
        icon: 'https://placehold.co/24x24',
        extraTitle: '600 ₽',
        extraDescription: 'за 1 час',
      },
      {
        name: 'Одиночный шезлонг деревянный 2',
        icon: 'https://placehold.co/24x24',
        extraTitle: '900 ₽',
        extraDescription: 'за 1 час',
      },
      {
        name: '2 шезлонга с зонтиком 2',
        icon: 'https://placehold.co/24x24',
        extraTitle: '1 800 ₽',
        extraDescription: 'за 3 часа',
      },
      {
        name: 'Качеля 2',
        icon: 'https://placehold.co/24x24',
        extraTitle: '1 200 ₽',
        extraDescription: 'за 1 час',
      },
      {
        name: 'Ракушка 2',
        icon: 'https://placehold.co/24x24',
        extraTitle: '9 800 ₽',
        extraDescription: 'за 3 часа',
      },
    ];
  }

  get infrastructure() {
    return [
      {
        name: 'Детская площадка',
        icon: 'https://placehold.co/24x24',
      },
      {
        name: 'Спортивный инвентарь',
        icon: 'https://placehold.co/24x24',
      },
      {
        name: '2 шезлонга с зонтиком',
        icon: 'https://placehold.co/24x24',
      },
      {
        name: 'Бар / напитки',
        icon: 'https://placehold.co/24x24',
      },
      {
        name: 'Туалет',
        icon: 'https://placehold.co/24x24',
      },
    ];
  }

  get peculiarities() {
    return [
      {
        name: 'Доступно для инвалидов',
        icon: 'https://placehold.co/24x24',
      },
      {
        name: 'Бесплатный wi-fi',
        icon: 'https://placehold.co/24x24',
      },
      {
        name: 'Можно с животными',
        icon: 'https://placehold.co/24x24',
      },
    ];
  }
}

export const beachStore = new BeachStore();
