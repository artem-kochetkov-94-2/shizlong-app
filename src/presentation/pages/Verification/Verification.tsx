import { IconButton } from "@src/presentation/ui-kit/IconButton";
import styles from './Verification.module.css';
import { useNavigate } from "react-router-dom";
import { Routes } from "@src/routes";
import ReactCodeInput from "react-code-input";
import smartphoneImg from './assets/smartphone.svg';
import messageImg from './assets/message.svg';
import { Button } from "@src/presentation/ui-kit/Button";
import { observer } from "mobx-react-lite";
import { verificationStore } from "@src/application/store/verificationStore";
import { CallStrategy } from "@src/domain/common/verification/callStrategy";
import { SmsStrategy } from "@src/domain/common/verification/smsStrategy";
import { useTimer } from "@src/application/hooks/useTimer";
import { Sheet } from 'react-modal-sheet';
import { useEffect } from "react";

const RESEND_INTERVAL_SECONDS = 5;

export const Verification = observer(() => {
    const navigate = useNavigate();
    const { phoneNumber, verificationError, strategy } = verificationStore;

    const isCallStrategy = strategy instanceof CallStrategy;
    const isSmsStrategy = strategy instanceof SmsStrategy;

    useEffect(() => {
        if (!phoneNumber) {
            navigate(Routes.Auth);
            return;
        }
    }, [phoneNumber]);

    const { timeLeft, setTimeLeft } = useTimer(RESEND_INTERVAL_SECONDS);

    return (
        <Sheet
            isOpen={true}
            onClose={() => navigate(Routes.Locations)}
            detent="content-height"
        >
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <div className={styles.wrapper}>
                        <div className={styles.title}>Введите код</div>

                        <img src={isCallStrategy ? smartphoneImg : messageImg} alt="smartphone" />

                        <IconButton
                            iconName="arrow-left"
                            size="medium"
                            shape="rounded"
                            className={styles.backButton}
                            onClick={() => navigate(-1)}
                            withShadow={false}
                        />

                        <IconButton
                            iconName="cross"
                            size="medium"
                            shape="rounded"
                            className={styles.closeButton}
                            onClick={() => navigate(Routes.Locations)}
                            withShadow={false}
                        />

                        <div className={styles.content}>
                            <div className={styles.description}>
                                {isCallStrategy && (
                                    <>
                                        На ваш телефон {phoneNumber} сейчас позвонит робот. Укажите <span>4 последние</span> цифры номера, с которого вам позвонили.
                                    </>
                                )}

                                {isSmsStrategy && (
                                    <>
                                        Мы отправили SMS с кодом проверки на ваш телефон {phoneNumber}. Укажите <span>проверочный код</span> из SMS
                                    </>
                                )}
                            </div>

                            <div className={styles.codeInputWrapper}>
                                <ReactCodeInput
                                    className={styles.codeInput}
                                    type='number'
                                    fields={4}
                                    name={"code"}
                                    inputMode={"tel"}
                                    onChange={(value) => {
                                        if (value.length === 4) {
                                            verificationStore.sendCode(value);
                                        }
                                    }}
                                />
                                {verificationError && <div className={styles.error}>{verificationError}</div>}
                            </div>

                            <div className={styles.footer}>
                                {timeLeft > 0 && (
                                    <div className={styles.hint}>
                                        Вы можете запросить код по SMS через <span>{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</span>
                                    </div>
                                )}

                                {timeLeft === 0 && (
                                    <Button
                                        className={styles.button}
                                        variant="tertiary"
                                        size="medium"
                                        fullWidth={false}
                                        onClick={() => {
                                            verificationStore.reinit();
                                            setTimeLeft(RESEND_INTERVAL_SECONDS);
                                        }}
                                    >
                                        Прислать код по SMS
                                        {/* Прислать код по SMS повторно */}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
    );
});
