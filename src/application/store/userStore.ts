import { makeAutoObservable } from 'mobx';
import { NotificationsStore, notificationsStore } from './notificationsStore';
import { PaymentStore, paymentStore } from './paymentStore';
import { verificationStore } from './verificationStore';
import { cacheService } from '../services/cacheService/cacheService';
import { KEY } from '../services/cacheService/types';
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

  async logout() {
    try {
      const result = await authorizationService.logout();
      console.log(result);
      cacheService.delete(KEY.Token);
    } catch (error) {
      console.log(error);
    }
  }
}

export const userStore = new UserStore();
