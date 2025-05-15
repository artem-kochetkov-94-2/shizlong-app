import styles from './Booking.module.css';
import { Button } from "@src/presentation/ui-kit/Button";
import { useState } from "react";
import { Calendar } from "@src/presentation/components/Calendar";
import { Sheet } from "react-modal-sheet";
import { useNavigate } from "react-router-dom";
import { bookStore } from "@src/application/store/bookStore";
import { observer } from "mobx-react-lite";
import { DateValue } from "@src/application/types/date";
import { Routes } from "@src/routes";
import { useSearchParams } from 'react-router-dom';
import { Module } from '@src/presentation/components/Module/Module';
import { useFetchModules } from '@src/application/hooks/useFetchModules';
import { Header } from './components/Header';
import { Modules } from './components/Modules';
import { Accessories } from './components/Accessories';
import { TimeView } from './components/TimeView';
import { Date } from './components/Date';
import { Rules } from './components/Rules';
import { profileStore } from '@src/application/store/profileStore';
import { SearchClient } from './components/SearchClient';
import { locationStore } from '@src/application/store/locationStore';

export const Booking = observer(() => {
    const navigate = useNavigate();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const moduleId = searchParams.get('module');

    const { bookPrice, isCreatingBooking } = bookStore;
    const { isCashier } = profileStore;
    const { location } = locationStore;

    useFetchModules();

    const onChange = (value: DateValue) => {
        bookStore.setDate(value);
        setIsCalendarOpen(false);
    };

    const onCreated = (id: number) => {
        navigate(Routes.BookingDetails.replace(':id', id.toString()));
    }

    const createBooking = () => {
        if (isCashier) {
            bookStore.createBookingByCashier(onCreated, location?.id!);
        } else {
            bookStore.createBooking(onCreated, location?.id!)
        }
    }

    return (
        <>
            <Sheet
                isOpen={true}
                onClose={() => navigate(-1)}
                detent="content-height"
            >
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <Header />
                        <Sheet.Scroller>
                            <div className={styles.content}>
                                <Modules />
                                {isCashier && <SearchClient />}
                                <Date onCalendarClick={() => setIsCalendarOpen(true)} />
                                <TimeView />
                                <Accessories />
                                <Rules />
                            </div>
                        </Sheet.Scroller>

                        <div className={styles.footer}>
                            {isCashier ? (
                                <Button
                                    size="medium"
                                    variant="yellow"
                                    disabled={isCreatingBooking}
                                    isLoading={isCreatingBooking}
                                    onClick={createBooking}
                                >
                                    Заказать
                                </Button>
                            ) : (
                                <Button
                                    size="medium"
                                    variant="yellow"
                                    disabled={isCreatingBooking}
                                    isLoading={isCreatingBooking}
                                    onClick={createBooking}
                                >
                                    Оплатить
                                </Button>
                            )}
                            <span>{bookPrice.toLocaleString()} ₽</span>
                        </div>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>

            {moduleId && <Module onClose={() => navigate(-1)} />}

            {isCalendarOpen && (
                <Calendar
                    isOpen={isCalendarOpen}
                    onClose={() => setIsCalendarOpen(false)}
                    initialValue={bookStore.date}
                    onChange={onChange}
                />
            )}
        </>
    );
});
