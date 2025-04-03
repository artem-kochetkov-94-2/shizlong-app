import { API_URL, API_URL_V2 } from "@src/const";
import { BookingRequest, BookingResponse, MyBookingsResponse } from "./types";
import { VerificationStore, verificationStore } from "@src/application/store/verificationStore";
import { RestService } from "../restService/restService";

const routes = {
  create: '/booking/create',
  myBookings: '/booking/get-my-bookings',
  cancel: '/booking/cancel',
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

    const response = await this.restService.post<MyBookingsResponse>({
      url: `${this.apiUrlV1}${routes.myBookings}`,
    });

    return response.response.bookings;
  }

  getCurrentBookings() {
    return [{}, {}, {}, {}, {}];
  }

  getCompletedBookings() {
    return [{}, {}, {}, {}, {}];
  }

  async createBooking(booking: BookingRequest) {
    const response = await this.restService.post<BookingResponse>({
      url: `${this.apiUrlV2}${routes.create}`,
      data: booking,
    });

    return response.response;
  }

  async cancelBooking(bookingId: number) {
    const response = await this.restService.post<BookingResponse>({
      url: `${this.apiUrlV1}${routes.cancel}/${bookingId}`,
    });

    return response.response;
  }
}

export const bookingsService = new BookingsService();
