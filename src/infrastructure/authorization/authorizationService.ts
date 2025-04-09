import { API_URL_V2 } from '@src/const';
import { ApiResponse } from '@src/infrastructure/types';
import { TryCodeResponse } from './types';
import { RestService } from '../restService/restService';

const routes = {
  requestCode: '/auth/request_code',
  verifyCode: '/auth/try_code',
  logout: '/auth/logout',
  sendSms: '/send-sms',
  verifySms: '/verify-sms-code',
};

class AuthorizationService {
  private readonly apiUrl = API_URL_V2;
  private readonly restService: RestService;

  constructor() {
    this.restService = new RestService();
  }

  async sendCode(phone: string) {
    const { response } = await this.restService.post<ApiResponse<unknown>>({
      url: `${this.apiUrl}${routes.requestCode}`,
      data: { phone },
    });
    return response.data as unknown;
  }

  async sendSms(phone: string) {
    const { response } = await this.restService.post<ApiResponse<unknown>>({
      url: `${this.apiUrl}${routes.sendSms}`,
      data: { phone },
    });
    return response.data as unknown;
  }

  async verifyCode(phone: string, code: string) {
    const { response } = await this.restService.post<TryCodeResponse>({
      url: `${this.apiUrl}${routes.verifyCode}`,
      data: { phone, code },
    });
    return response;
  }

  async verifySms(phone: string, code: string) {
    const { response } = await this.restService.post<TryCodeResponse>({
      url: `${this.apiUrl}${routes.verifySms}`,
      data: { phone, code },
    });
    return response;
  }
  async logout() {
    const { response } = await this.restService.get({
      url: `${this.apiUrl}${routes.logout}`,
    });
    return response;
  }
}

export const authorizationService = new AuthorizationService();
