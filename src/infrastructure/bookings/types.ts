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
