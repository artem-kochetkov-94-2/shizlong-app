import { API_URL, API_URL_V2 } from "@src/const";
import { BookingRequest, BookingResponse, MyBookingsResponse } from "./types";
import { VerificationStore, verificationStore } from "@src/application/store/verificationStore";
import { validateResponse } from "../validateResponse";
import { RestService } from "../restService/restService";

const routes = {
  create: '/booking/create',
  myBookings: '/booking/get-my-bookings',
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

    const response = await fetch(`${this.apiUrlV1}${routes.myBookings}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.verificationStore.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const result: MyBookingsResponse = await response.json();

    return result.bookings;
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
}

export const bookingsService = new BookingsService();
