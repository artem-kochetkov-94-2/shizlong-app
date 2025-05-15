import { Accessory, BookingModule } from "../bookings/types";

export type GetUserResponse = {
    id: 10
    name: string;
    phone: string;
}

export type BookingRequestByCashier = {
    modules: BookingModule[];
    accessories: Accessory[];
    location_id: number;
    user_id?: number;
    promo_code?: string;
};

export type BookingResponseByCashier = {
    id: number;
}