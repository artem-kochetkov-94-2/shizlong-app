import { API_URL, API_URL_V2 } from "@src/const";
import { BookingRequest, MyBookingsResponse } from "./types";
import { VerificationStore, verificationStore } from "@src/application/store/verificationStore";

const routes = {
  create: '/booking/create',
  myBookings: '/booking/get-my-bookings',
};

class BookingsService {
  private readonly apiUrlV1 = API_URL;
  private readonly apiUrlV2 = API_URL_V2;
  private readonly verificationStore: VerificationStore;

  constructor() {
    this.verificationStore = verificationStore;
  }

  async getMyBookings() {
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
    const response = await fetch(`${this.apiUrlV2}${routes.create}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.verificationStore.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    });

    const result: unknown = await response.json();

    return result
  }
}

export const bookingsService = new BookingsService();
