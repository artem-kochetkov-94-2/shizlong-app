import { API_URL, API_URL_V2 } from '@src/const';
import {
  BookingRequest,
  BookingResponse,
  MyBookingsResponse,
  // PaymentStatusResponse,
} from './types';
import {
  VerificationStore,
  verificationStore,
} from '@src/application/store/verificationStore';
import { RestService } from '../restService/restService';

const routes = {
  create: '/booking/create',
  createGroup: '/booking/create-group',
  myBookings: '/customer/bookings',
  cancel: '/booking/cancel',
  paymentStatus: '/booking/status/'
};

class BookingsService {
  private readonly apiUrlV1 = API_URL;
  private readonly apiUrlV2 = API_URL_V2;
  private readonly verificationStore: VerificationStore;
  private readonly restService: RestService;

  constructor() {
    this.verificationStore = verificationStore;
    this.restService = new RestService();
  }

  async getMyBookings() {
    if (!this.verificationStore.accessToken) {
      return [];
    }

    const { response } = await this.restService.post<MyBookingsResponse>({
      url: `${this.apiUrlV2}${routes.myBookings}`,
    });

    return response;
  }

  async createBooking(booking: BookingRequest) {
    const { response } = await this.restService.post<BookingResponse>({
      url: `${this.apiUrlV2}${routes.create}`,
      data: booking,
    });

    return response;
  }

  async createGroupBooking(booking: BookingRequest) {
    const { response } = await this.restService.post<BookingResponse>({
      url: `${this.apiUrlV2}${routes.createGroup}`,
      data: booking,
    });

    return response;
  }

  async cancelBooking(bookingId: number) {
    const { response } = await this.restService.post<BookingResponse>({
      url: `${this.apiUrlV1}${routes.cancel}/${bookingId}`,
    });

    return response;
  }

  // async getPaymentStatus(bookingId: number) {
  //   const { response } = await this.restService.get<PaymentStatusResponse>({
  //     url: `${this.apiUrlV2}${routes.paymentStatus}${bookingId}`,
  //   });

  //   return response;
  // }
}

export const bookingsService = new BookingsService();
