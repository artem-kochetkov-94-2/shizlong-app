import { API_URL_V2 } from '@src/const';
import { ApiResponse } from '@src/infrastructure/types';
import { CheckReverseCallVerification, RquestReverseCallResponse, TryCodeResponse } from './types';
import { RestService } from '../restService/restService';

const routes = {
  requestCode: '/auth/request_code',
  verifyCode: '/auth/try_code',
  logout: '/auth/logout',
  sendSms: '/send-sms',
  verifySms: '/verify-sms-code',
  requestReverseCall: '/auth/request_reverse_call',
  checkReverseCallVerification: '/auth/check_reverse_call_verification',
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

  async requestReverseCall(phone: string) {
    const { response } = await this.restService.post<RquestReverseCallResponse>({
      url: `${this.apiUrl}${routes.requestReverseCall}`,
      data: { phone },
    });

    if (!response.success) {
      throw new Error('Request reverse call error');
    }

    return response;
  }

  async checkReverseCallVerification(phone: string) {
    const { response } = await this.restService.post<CheckReverseCallVerification>({
      url: `${this.apiUrl}${routes.checkReverseCallVerification}`,
      data: { phone },
    });

    if ('access_token' in response) {
      return response;
    }

    throw new Error('Check reverse call verification error');
  }

  async logout() {
    const { response } = await this.restService.get({
      url: `${this.apiUrl}${routes.logout}`,
    });
    return response;
  }
}

export const authorizationService = new AuthorizationService();
