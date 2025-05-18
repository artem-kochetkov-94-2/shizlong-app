import { API_URL_V2 } from '@src/const';
import { RestService } from '../restService/restService';
import { BookingRequestByCashier, BookingResponseByCashier, GetUserResponse } from './types';

const routes = {
  searchUser: '/cashier/user/get',
  createBooking: '/cashier/bookings/create-group',
};

export class CashiserService {
  private readonly apiUrlV2 = API_URL_V2;
  private readonly restService: RestService;

  constructor() {
    this.restService = new RestService();
  }

  async getUser(phone: string) {
    const data: {
      phone: string;
    } = {
      phone,
    };

    const { response } = await this.restService.post<GetUserResponse>({
      url: `${this.apiUrlV2}${routes.searchUser}`,
      data
    });

    return response;
  }

  async createGroupBooking(booking: BookingRequestByCashier) {
    const { response } = await this.restService.post<BookingResponseByCashier>({
      url: `${this.apiUrlV2}${routes.createBooking}`,
      data: booking,
    });

    return response;
  }
}

export const cashierService = new CashiserService();
