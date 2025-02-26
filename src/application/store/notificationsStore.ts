import { makeAutoObservable } from 'mobx';

class NotificationsStore {
  notifications: unknown[] = [{}, {}];

  constructor() {
    makeAutoObservable(this);
  }
}

export const notificationsStore = new NotificationsStore();
