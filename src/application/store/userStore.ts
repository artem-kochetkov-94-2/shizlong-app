import { makeAutoObservable } from 'mobx';
import { NotificationsStore, notificationsStore } from './notificationsStore';
import { PaymentStore, paymentStore } from './paymentStore';

export class UserStore {
  notificationsStore: NotificationsStore;
  paymentStore: PaymentStore;

  constructor() {
    makeAutoObservable(this);
    this.notificationsStore = notificationsStore;
    this.paymentStore = paymentStore;
  }

  async init() {
    this.notificationsStore.checkTelegramStatus();
    this.paymentStore.getTokens();
  }
}

export const userStore = new UserStore();
