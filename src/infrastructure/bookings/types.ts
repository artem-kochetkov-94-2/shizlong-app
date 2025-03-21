export interface BookingRequest {
    module_id: number;
    start_time: string;
    end_time: string;
    timeZone: string;
    accessories: Accessory[];
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
        sector_id: number;
        sector: {
            id: number;
            name: string;
            location_id: number;
            location: {
                id: number;
                name: string;
                link_space: string;
            }
        }
    }
}

type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
