import { autorun, makeAutoObservable, runInAction } from 'mobx';
import { bookingsService } from '@src/infrastructure/bookings/bookingsService';
import { CashierBookingResponse, MyBookingsResponse } from '@src/infrastructure/bookings/types';

type Reponse = MyBookingsResponse | CashierBookingResponse;

export class BookingsPages<T extends Reponse> {
  private bookingsService = bookingsService;
  isLoading: boolean = false;
  bookings: T | null = null;
  bookingsData: T['data'] = [];
  page: number = 1;
  sectorId: number | undefined = undefined;
  statuses: string[] = [];
  isCashier: boolean = false;

  constructor(statuses: string[], sectorId?: number, isCashier = false) {
    makeAutoObservable(this);
    this.statuses = statuses;
    this.sectorId = sectorId;
    this.isCashier = isCashier;

    autorun(() => {
      const page = this.page;
      const isCashier = this.isCashier;

      if (isCashier) {
        this.getCahsierBookings(page);
      } else {
        this.getMyBookings(page);
      }
    })
  }

  async getMyBookings(page = 1) {
    try {
      this.isLoading = true;
      const bookings = await this.bookingsService.getMyBookings(page, this.statuses, this.sectorId);
      runInAction(() => {
        this.bookings = bookings;
        this.bookingsData = [...this.bookingsData, ...(bookings?.data ?? [])]
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  async getCahsierBookings(page = 1) {
    try {
      const bookings = await bookingsService.getCashierBookings(page, this.statuses, this.sectorId);
      runInAction(() => {
        this.bookings = bookings;
        this.bookingsData = [...this.bookingsData, ...(bookings?.data ?? [])]
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  get isEmptyBookings() {
    if (!this.bookingsData.length) return true;
  }

  nextPage() {
    if (this.bookingsData.length === this.bookings?.meta.total) return;
    runInAction(() => {
      this.page = this.page + 1;
    })
  }
}
