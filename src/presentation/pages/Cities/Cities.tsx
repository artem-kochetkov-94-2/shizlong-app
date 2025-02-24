import { Button } from "@src/presentation/ui-kit/Button";
import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { Drawer } from "@src/presentation/ui-kit/Drawer";
import styles from "./Cities.module.css";
import citiesImg from "./assets/cities.svg";
import { SearchInput } from "@src/presentation/ui-kit/SearchInput";
import { useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { Routes } from "@src/routes";

export const Cities = () => {
    const navigate = useNavigate();
    const cities = Array.from(new Set(['Сочи', 'Туапсе', 'Краснодар', 'Анапа', 'Ялта', 'Геленджик', 'Ростов-на-Дону', 'Волгоград', 'Владивосток', 'Екатеринбург', 'Санкт-Петербург', 'Москва', 'Казань', 'Нижний Новгород', 'Самара', 'Уфа', 'Красноярск', 'Новосибирск', 'Екатеринбург', 'Санкт-Петербург', 'Москва', 'Казань', 'Нижний Новгород', 'Самара', 'Уфа', 'Красноярск', 'Новосибирск']));
    const [city, setCity] = useState('Сочи');
    const [search, setSearch] = useState('');
    const filteredCities = cities.filter(c => c.toLowerCase().includes(search.toLowerCase()));
    const buttonDisabled = filteredCities.filter(c => c === city).length === 0;

    const header = (
        <div className={styles.header}>
            <div className={styles.headerCol}>
                <img className={styles.img} src={citiesImg} alt="cities" />
            </div>
            <div className={styles.headerCol}>
                <div className={styles.title}>Укажите ваш город</div>
            </div>
            <div className={styles.headerCol}>
                <IconButton
                    iconName="cross"
                    size="large"
                    shape="rounded"
                    onClick={() => navigate(Routes.Home)}
                />
            </div>
        </div>
    );

    const content = (
        <>
            <SearchInput
                placeholder="Найти город"
                withBorder={true}
                value={search}
                onChange={setSearch}
                size="large"
            />
            <div className={styles.cities}>
                {filteredCities.map(c => (
                    <div
                        key={c}
                        className={classNames(styles.city, { [styles.active]: city === c })}
                        onClick={() => setCity(c)}
                    >
                        <span>{c}</span>
                        {city === c && (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="12" fill="#FFBC02"/>
                                <path d="M18.4 8L10.4 16L6.40002 12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        )}
                    </div>
                ))}
            </div>
        </>
    );

    const footer = (
        <Button
            size="large"
            variant="secondary"
            disabled={buttonDisabled}
        >
            Далее
        </Button>
    );

    return (
        <Drawer
            header={header}
            drawerContent={content}
            footer={footer}
        />
    );
}
