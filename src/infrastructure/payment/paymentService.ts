import { API_URL_V2 } from '@src/const';
import { ProcessPaymentRequestBody, ProcessPaymentResponse, SessionResponse, TokenResponse } from './types';
import { RestService } from '../restService/restService';

const routes = {
  getSession: '/payments/get_session',
  addNewCard: '/payments/add_card',
  tokens: '/payments/customer/tokens',
  processPayment: '/payments/process_payment',
  deleteToken: '/payments/tokens',
};

class PaymentService {
  private readonly apiUrl = API_URL_V2;
  private readonly restService: RestService;

  constructor() {
    this.restService = new RestService();
  }

  async getSession() {
    const { response } = await this.restService.get<SessionResponse>({
      url: `${this.apiUrl}${routes.getSession}`,
    });
    return response;
  }

  // async addNewCard(token: string, sessionId: string) {
  //   const { response } = await this.restService.post({
  //     url: `${this.apiUrl}${routes.addNewCard}`,
  //     data: {
  //       session_id: sessionId,
  //       token: token,
  //     },
  //   });

  //   console.log(response);
  // }

  async getTokens() {
    const { response } = await this.restService.get<TokenResponse>({
      url: `${this.apiUrl}${routes.tokens}`,
    });
    return response;
  }

  async processPayment(requestBody: ProcessPaymentRequestBody) {
    const { response } = await this.restService.post<ProcessPaymentResponse>({
      url: `${this.apiUrl}${routes.processPayment}`,
      data: requestBody,
    });

    console.log(response);

    if (response.status.name !== 'COMPLETE') {
      throw new Error('Payment failed');
    }

    return response;
  }

  async deleteToken(tokenId: number) {
    const { response } = await this.restService.delete({
      url: `${this.apiUrl}${routes.deleteToken}/${tokenId}`,
    });

    console.log(response);
  }
}

export const paymentService = new PaymentService();
