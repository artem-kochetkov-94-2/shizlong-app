import { API_URL } from '@src/const';
import { CheckTelegramStatusResponse, getTelegramCodeResponse } from './types';
import {
  VerificationStore,
  verificationStore,
} from '@src/application/store/verificationStore';
import { RestService } from '../restService/restService';

const routes = {
  telegram: '/telegram/get-subscription-code',
  telegramCheckStatus: '/telegram/check-subscription',
};

class NotificationsService {
  private readonly apiUrlV1 = API_URL;
  private readonly verificationStore: VerificationStore;
  private readonly restService: RestService;

  constructor() {
    this.verificationStore = verificationStore;
    this.restService = new RestService();
  }

  async getTelegramCode() {
    if (!this.verificationStore.accessToken) {
      throw new Error('Нет токена');
    }

    const { response } = await this.restService.post<getTelegramCodeResponse>({
      url: `${this.apiUrlV1}${routes.telegram}`,
    });

    return response.code;
  }

  async checkTelegramStatus() {
    if (!this.verificationStore.accessToken) {
      throw new Error('Нет токена');
    }

    const { response } = await this.restService.post<CheckTelegramStatusResponse>({
      url: `${this.apiUrlV1}${routes.telegramCheckStatus}`,
    });

    return response;
  }
}

export const notificationsService = new NotificationsService();
