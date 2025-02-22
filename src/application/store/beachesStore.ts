import { RawBeach } from '@src/infrastructure/beaches/types';
import { mockCardListData } from '@src/mocks/mockCardListData';
import { makeAutoObservable } from 'mobx';

class BeachesStore {
  beaches: RawBeach[] = mockCardListData;

  constructor() {
    makeAutoObservable(this);
  }

  setBeaches(beaches: RawBeach[]) {
    this.beaches = beaches;
  }
}

export const beachStore = new BeachesStore();
