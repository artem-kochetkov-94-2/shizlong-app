import { API_URL } from '@src/const';
import { getTelegramCodeResponse } from './types';
import {
  VerificationStore,
  verificationStore,
} from '@src/application/store/verificationStore';

const routes = {
  telegram: '/telegram/get-subscription-code',
  telegramCheckStatus: '/telegram/check-subscription',
};

class NotificationsService {
  private readonly apiUrlV1 = API_URL;
  private readonly verificationStore: VerificationStore;

  constructor() {
    this.verificationStore = verificationStore;
  }

  async getTelegramCode() {
    if (!this.verificationStore.accessToken) {
      return;
    }

    const response = await fetch(`${this.apiUrlV1}${routes.telegram}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.verificationStore.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const result: getTelegramCodeResponse = await response.json();

    return result.code;
  }

  async checkTelegramStatus() {
    if (!this.verificationStore.accessToken) {
      return false;
    }

    const response = await fetch(`${this.apiUrlV1}${routes.telegramCheckStatus}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.verificationStore.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    return result;
  }
}

export const notificationsService = new NotificationsService();
