import { autorun, makeAutoObservable } from 'mobx';
import { NotificationsStore, notificationsStore } from './notificationsStore';
import { PaymentStore, paymentStore } from './paymentStore';
import { VerificationStore, verificationStore } from './verificationStore';
import { authorizationService } from '@src/infrastructure/authorization/authorizationService';
import { ProfileStore, profileStore } from './profileStore';

export class UserStore {
  notificationsStore: NotificationsStore;
  paymentStore: PaymentStore;
  profileStore: ProfileStore;
  verificationStore: VerificationStore;

  constructor() {
    makeAutoObservable(this);
    this.notificationsStore = notificationsStore;
    this.paymentStore = paymentStore;
    this.profileStore = profileStore;
    this.verificationStore = verificationStore;

    autorun(() => {
      const isVerified = verificationStore.isVerified;

      if (isVerified) {
        this.init();
      }
    });
  }

  async init() {
    this.notificationsStore.checkTelegramStatus();
    this.paymentStore.getTokens();
    this.profileStore.getProfile();
  }

  async logout(cb: () => void) {
    try {
      const result = await authorizationService.logout();
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      this.verificationStore.clear();
      this.profileStore.clear();
      cb();
    }
  }
}

export const userStore = new UserStore();
