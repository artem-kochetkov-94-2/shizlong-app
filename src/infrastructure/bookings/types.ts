import { RawLocation, RawModule, RawSector, RawSectorSchema } from "../Locations/types";

export type BookingModule = {
    module_id: number;
    start_time: string;
    end_time: string;
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

export type MyBookingsResponse = RawBooking[];

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
    sector_scheme: RawBoookingSectorScheme;
    status: {
        description: string;
        name: BookingStatus;
    }
    tokens: unknown[];
    total_price: { value: number; formatted_value: string };
    qr: string;
}

type PaymentStatus = 'processing' | 'complete' | 'cancel';

type PaymentStatusUppercase = 'PROCESSING' | 'COMPLETE' | 'CANCEL';

type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'reserved' | 'busy';

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
