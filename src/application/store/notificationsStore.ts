import { notificationsService } from '@src/infrastructure/notifications/notificationService';
import { makeAutoObservable } from 'mobx';

class NotificationsStore {
  private notificationsService = notificationsService;
  notifications: unknown[] = [{}, {}];
  isLoading: boolean = false;
  telegramCode: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  async getTelegramCode() {
    try {
      this.isLoading = true;
      const code = await this.notificationsService.getTelegramCode();
      this.telegramCode = code;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}

export const notificationsStore = new NotificationsStore();
