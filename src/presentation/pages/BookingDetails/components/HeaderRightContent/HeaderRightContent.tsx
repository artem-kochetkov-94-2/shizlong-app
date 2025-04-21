import { profileStore } from "@src/application/store/profileStore";
import { ClientContent } from "./ClientContent";
import { CashierContent } from "./CashierContent";
import { RawBooking } from "@src/infrastructure/bookings/types";

interface HeaderRightContentProps {
  booking: RawBooking;
}

export const HeaderRightContent = ({ booking }: HeaderRightContentProps) => {
  const { isCashier } = profileStore;

  return isCashier ? <CashierContent booking={booking} /> : <ClientContent booking={booking} />;
};
