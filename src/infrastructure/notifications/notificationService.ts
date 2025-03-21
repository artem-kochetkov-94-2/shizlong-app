import {
  VerificationStore,
  verificationStore,
} from '@src/application/store/verificationStore';
import { API_URL } from '@src/const';
import { TelegramResponse } from './types';

const routes = {
  telegram: '/telegram/get-subscription-code',
};

class NotificationsService {
  private readonly apiUrlV1 = API_URL;
  private readonly verificationStore: VerificationStore;

  constructor() {
    this.verificationStore = verificationStore;
  }

  async getTelegramCode() {
    const response = await fetch(`${this.apiUrlV1}${routes.telegram}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.verificationStore.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const result: TelegramResponse = await response.json();

    return result.code;
  }
}

export const notificationsService = new NotificationsService();
