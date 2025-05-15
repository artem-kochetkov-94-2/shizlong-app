import styles from './Booking.module.css';
import { Card } from "@src/presentation/ui-kit/Card";
import { Button } from "@src/presentation/ui-kit/Button";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { useState } from "react";
import { Calendar } from "@src/presentation/components/Calendar";
// import { Time } from "./components/Time";
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

export const Booking = observer(() => {
    const navigate = useNavigate();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    // const [isTimeOpen, setIsTimeOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const moduleId = searchParams.get('module');

    const {
        formattedDate,
        formattedTime,
        bookPrice,
        isCreatingBooking,
    } = bookStore;


    useFetchModules();

    const onChange = (value: DateValue) => {
        bookStore.setDate(value);
        setIsCalendarOpen(false);
    };

    const onCreated = (id: number) => {
        navigate(Routes.BookingDetails.replace(':id', id.toString()));
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

                                <Card className={styles.card}>
                                    <div>Клиент</div>
                                </Card>

                                <Card className={styles.card}>
                                    <div className={styles.date}>
                                        <div className={styles.cardTitle}>
                                            <span>Дата</span>
                                            <span>{formattedDate}</span>
                                        </div>

                                        <Icon
                                            name="calendar"
                                            size="small"
                                            onClick={() => setIsCalendarOpen(true)}
                                        />
                                    </div>
                                </Card>

                                <Card className={styles.card}>
                                    <div className={styles.time}>
                                    {/* <div className={styles.time} onClick={() => setIsTimeOpen(true)}> */}
                                        <div className={styles.cardTitle}>
                                            <span>Часы</span>
                                            <span>{formattedTime}</span>
                                        </div>

                                        {/* <Tag size="medium" text={formattedDuration} /> */}
                                        {/* <Icon name="arrow-right" size="small" /> */}
                                    </div>
                                </Card>

                                {/* <Card className={styles.card}>
                                    <div className={styles.people}>
                                        <div className={styles.cardTitle}>
                                            <span>Количество гостей</span>
                                            <span>1 человек</span>
                                        </div>

                                        <Icon name="arrow-right" size="small" />
                                    </div>
                                </Card> */}

                                <Accessories />
                                
                                {/* @todo */}
                                {/* <Card className={styles.promocode}>
                                    <div className={styles.promocodeTitle}>Есть промокод?</div>
                                    <div className={styles.promocodeRow}>
                                        <input
                                            className={styles.promocodeInput}
                                            placeholder="введите код"
                                        />
                                        <Button size="medium" variant="gray">Применить</Button>
                                    </div>
                                </Card> */}

                                {/* <div className={styles.promocodeAccepted}>
                                    <Icon name="check3" size="small" />
                                    <div className={styles.promocodeAcceptedTitle}>Промокод применён</div>
                                </div> */}

                                <div className={styles.rules}>
                                    Оформляя заказ, вы соглашаетесь с <span>Правилами пляжа</span>
                                </div>
                            </div>
                        </Sheet.Scroller>
                        <div className={styles.footer}>
                            <Button
                                size="medium"
                                variant="yellow"
                                disabled={isCreatingBooking}
                                isLoading={isCreatingBooking}
                                onClick={() => bookStore.createBooking(onCreated)}
                            >
                                Оплатить
                            </Button>
                            <span>{bookPrice.toLocaleString()} ₽</span>
                        </div>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>

            {moduleId && (
                <Module
                    onClose={() => navigate(-1)}
                />
            )}

            {isCalendarOpen && (
                <Calendar
                    isOpen={isCalendarOpen}
                    onClose={() => setIsCalendarOpen(false)}
                    initialValue={bookStore.date}
                    onChange={onChange}
                />
            )}

            {/* {isTimeOpen && (
                <Time
                    isOpen={isTimeOpen}
                    onClose={() => setIsTimeOpen(false)}
                    startTime={bookStore.formStartTime}
                    endTime={bookStore.endTime}
                />
            )} */}
        </>
    );
});
