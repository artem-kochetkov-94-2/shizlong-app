import { RawLocation, RawModule, RawSector, RawSectorSchema } from "../Locations/types";

export type BookingModule = {
    module_id: number;
    start_time: string;
    end_time: string;
} | {
    module_id: number;
    module_scheme_id: number;
    module_scheme_date: string;
}

export type BookingRequest = {
    modules: BookingModule[];
    accessories: Accessory[];
};

interface Card {
    id: number;
    token: Token;
    created_at: string | null;
    updated_at: string;
}

interface Token {
    id: number;
    expiration_date: string;
    card_holder_name: string;
    last_four_digits: string;
}

export interface BookingResponse {
    id: number;
    message: string;
    reserve_seconds: number;
    module_id: number;
    booking_id: number;
    total_price: number;
    qr: string;
    cards: Card[];
}

interface Accessory {
    id: string;
    type: string;
    quantity: string;
}

export type MyBookingsResponse = {
    data: RawBooking[];
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    }
}

// Booking

interface RawBookingAccessory {
    id: number;
    quantity: number;
    beach_accessory?: {
        id: number;
        name: string;
        link_icon: string;
        price?: {
            value: number;
            formatted_value: string;
        }
    }
}

interface RawBookingCustomer {
    id: number;
    name: string;
    phone: string;
}

interface RawBookingModule {
    end_time: string;
    id: number;
    price: number;
    start_time: string;
    module: RawModule;
}

interface RawBookingPayment {
    id: number;
    payed_sum: number;
    status: {
        name: PaymentStatusUppercase;
        description: string;
    }
    sum: number;
}

interface RawBoookingSectorScheme extends RawSectorSchema {
    sector: RawSector & {
        location: RawLocation;
    };
}

export interface RawBooking {
    accessories: RawBookingAccessory[];
    customer: RawBookingCustomer;
    id: number;
    booking_modules: RawBookingModule[];
    payment: RawBookingPayment;
    sector_scheme?: RawBoookingSectorScheme;
    status: {
        description: string;
        name: BookingStatus;
    }
    tokens: unknown[];
    total_price: { value: number; formatted_value: string };
    qr: string;
}

export interface RawCashierBooking {
  id: number;
  total_price: {
    value: number;
    formatted_value: string;
  };
  status: {
    name: BookingStatus;
    description: string;
  };
  accessories: RawBookingAccessory[];
  sector_scheme: RawBoookingSectorScheme;
  booking_modules: RawBookingModule[];
  modules_count: number;
  customer: RawBookingCustomer;
  booked_user: null | {
    id: number;
    name: string;
    phone: string;
  };
}

export interface CashierBookingResponse {
  data: RawCashierBooking[];
  links: {
    first: string;
    last: string | null;
    next: string;
    prev: string | null;
  }
  meta: {
    current_page: number;
    from: number;
    path: string;
    per_page: number;
    to: number;
  }
}

type PaymentStatus = 'processing' | 'complete' | 'cancel';

type PaymentStatusUppercase = 'PROCESSING' | 'COMPLETE' | 'CANCEL';

type BookingStatus = 'confirmed' | 'cancelled' | 'completed' | 'reserved' | 'busy';

export interface PaymentStatusResponse {
    id: number;
    start_time: string;
    end_time: string;
    total_price: number;
    status: BookingStatus;
    payment: {
        status: PaymentStatus;
    }
}
