import { API_URL, API_URL_V2 } from '@src/const';
import {
  BookingRequest,
  BookingResponse,
  CashierBookingResponse,
  MyBookingsResponse,
  RawBooking,
  RawCashierBooking,
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

  cancelByClient: '/booking/:id/cancel',
  closeByClient: '/booking/:id/close',

  paymentStatus: '/booking/status/',
  cashierBookings: '/cashier/bookings/get',

  getClientBooking: '/customer/bookings',
  getCashierBooking: '/cashier/bookings',

  cancelByCashier: '/cashier/bookings/:id/cancel',
  confirmByCashier: '/cashier/bookings/:id/confirm',
  closeByCashier: '/cashier/bookings/:id/close',
};

export class BookingsService {
  private readonly apiUrlV2 = API_URL_V2;
  private readonly verificationStore: VerificationStore;
  private readonly restService: RestService;

  constructor() {
    this.verificationStore = verificationStore;
    this.restService = new RestService();
  }

  async getClientBooking(id: number) {
    if (!this.verificationStore.accessToken) {
      return null;
    }

    const { response } = await this.restService.get<RawBooking>({
      url: `${this.apiUrlV2}${routes.getClientBooking}/${id}`,
    });

    return response;
  }

  async getCashierBooking(id: number) {
    if (!this.verificationStore.accessToken) {
      return null;
    }

    const { response } = await this.restService.get<RawCashierBooking>({
      url: `${this.apiUrlV2}${routes.getCashierBooking}/${id}`,
    });

    return response;
  }

  async getMyBookings(page: number, status?: string[], sectorId?: number) {
    if (!this.verificationStore.accessToken) {
      return null;
    }

    const data: {
      status?: string[];
      sector_id?: number;
    } = {};
    if (status) data.status = status;
    if (sectorId) data['sector_id'] = sectorId;

    const { response } = await this.restService.post<MyBookingsResponse>({
      url: `${this.apiUrlV2}${routes.myBookings}?page=${page}`,
      data
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

  async cancelBookingByClient(bookingId: number) {
    const { response } = await this.restService.post<BookingResponse>({
      url: `${this.apiUrlV2}${routes.cancelByClient.replace(':id', bookingId.toString())}`,
    });

    return response;
  }

  async cancelBookingByCashier(bookingId: number) {
    const { response } = await this.restService.get<unknown>({
      url: `${this.apiUrlV2}${routes.cancelByCashier.replace(':id', bookingId.toString())}`,
    });

    return response;
  }

  async confirmBookingByCashier(bookingId: number) {
    const { response } = await this.restService.get<unknown>({
      url: `${this.apiUrlV2}${routes.confirmByCashier.replace(':id', bookingId.toString())}`,
    });

    return response;
  }

  async closeBookingByClient(bookingId: number) {
    const { response } = await this.restService.get<unknown>({
      url: `${this.apiUrlV2}${routes.closeByClient.replace(':id', bookingId.toString())}`,
    });

    return response;
  }

  async closeBookingByCashier(bookingId: number) {
    const { response } = await this.restService.get<unknown>({
      url: `${this.apiUrlV2}${routes.closeByCashier.replace(':id', bookingId.toString())}`,
    });

    return response;
  }

  async getCashierBookings(page: number, status?: string[], sectorId?: number) {
    const data: {
      status?: string[];
      sector_id?: number;
    } = {};
    if (status) data.status = status;
    if (sectorId) data['sector_id'] = sectorId;

    const { response } = await this.restService.post<CashierBookingResponse>({
      url: `${this.apiUrlV2}${routes.cashierBookings}?page=${page}`,
      data
    });

    return response;
  }
}

export const bookingsService = new BookingsService();
