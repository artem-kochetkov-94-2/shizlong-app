export interface BookingRequest {
    module_id: number;
    start_time: string;
    end_time: string;
    timeZone: string;
    accessories: Accessory[];
}

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

export interface MyBookingsResponse {
    success: boolean;
    bookings: RawBooking[];
}

export interface RawBooking {
    id: number;
    booked_by: number;
    customer_id: number;
    module_id: number;
    start_time: string;
    end_time: string;
    total_price: number;
    status: BookingStatus;
    created_at: string;
    updated_at: string;
    qr_code: string;
    module: {
        id: number;
        name: string;
        number: string;
        sector_id: number;
        placed_icon_id: number;
        placed_icon_group_id: number | null;
        placed_icon: {
            id: number;
            link_icon: string;
        };
        placed_icon_group: null,
        sector: {
            id: number;
            name: string;
            location_id: number;
            location: {
                id: number;
                name: string;
                link_space: string;
                address: string;
                city: string;
                region: string;
                district: string | null;
            };
        };
    };
    booking_accessories: {
        id: number;
        booking_id: number;
        beach_accessory_id: number;
        quantity: number;
        beach_accessory: {
            id: number;
            name: string;
            price: number;
            link_icon: string;
        }
    }[];
}

type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'reserved';

export interface PaymentStatusResponse {
    id: number;
    start_time: string;
    end_time: string;
    total_price: number;
    status: BookingStatus;
    payment: {
        status: 'processing' | 'complete' | 'cancel';
    }
}
