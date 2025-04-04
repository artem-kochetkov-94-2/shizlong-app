import { API_URL } from '@src/const';
import { CheckTelegramStatusResponse, getTelegramCodeResponse } from './types';
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
      throw new Error('Нет токена');
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

    if (!result.success) {
      throw new Error(`Ошибка`);
    }

    return result.code;
  }

  async checkTelegramStatus() {
    if (!this.verificationStore.accessToken) {
      throw new Error('Нет токена');
    }

    const response = await fetch(`${this.apiUrlV1}${routes.telegramCheckStatus}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.verificationStore.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json() as CheckTelegramStatusResponse;

    return result;
  }
}

export const notificationsService = new NotificationsService();
