import { Button } from "@src/presentation/ui-kit/Button"
import { IconButton } from "@src/presentation/ui-kit/IconButton";
import styles from './Auth.module.css';
import { useNavigate } from "react-router-dom";
import { Routes } from "@src/routes";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { verificationStore } from "@src/application/store/verificationStore";
import { Sheet } from 'react-modal-sheet';

export const Auth = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState('');

    const submit = () => {
        verificationStore.reset();
        verificationStore.setPhoneNumber(value);
        verificationStore.startVerification();
        navigate(Routes.Verification);
    }

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
                        <div className={styles.title}>Авторизация</div>

                        <IconButton
                            iconName="cross"
                            size="medium"
                            shape="rounded"
                            className={styles.closeButton}
                            onClick={() => navigate(Routes.Locations)}
                            withShadow={false}
                        />

                        <div className={styles.content}>
                            <div className={styles.label}>Введите свой номер телефона</div>

                            <PhoneInput
                                country={'ru'}
                                value={value}
                                onChange={v => setValue(v)}
                                specialLabel={'Номер телефона'}
                                placeholder={'000 000 0000'}
                                containerClass={styles.input}
                            />

                            <Button
                                variant="primary"
                                size="large"
                                disabled={value.length !== 11}
                                onClick={submit}
                                withShadow={true}
                            >
                                Авторизация
                            </Button>

                            <div className={styles.hint}>
                                Нажимая «Войти», вы соглашаетесь с <a href="#">Условиями использования</a> и <a href="#">Политикой конфиденциальности</a>
                            </div>
                        </div>
                    </div>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
    )
};
