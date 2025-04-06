import { makeAutoObservable } from 'mobx';
import { NotificationsStore, notificationsStore } from './notificationsStore';
import { PaymentStore, paymentStore } from './paymentStore';
import { verificationStore } from './verificationStore';

import { authorizationService } from '@src/infrastructure/authorization/authorizationService';

export class UserStore {
  notificationsStore: NotificationsStore;
  paymentStore: PaymentStore;

  constructor() {
    makeAutoObservable(this);
    this.notificationsStore = notificationsStore;
    this.paymentStore = paymentStore;
  }

  async init() {
    if (verificationStore.isVerified) {
      this.notificationsStore.checkTelegramStatus();
      this.paymentStore.getTokens();
    }
  }

  async logout(cb: () => void) {
    try {
      const result = await authorizationService.logout();
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      verificationStore.clear();
      cb();
    }
  }
}

export const userStore = new UserStore();
