import { Drawer } from "@presentation/ui-kit/Drawer";
import { beachStore } from "@src/application/store/beach";
import { observer } from "mobx-react-lite";
import { Contacts } from "./components/Contacts";
import { About } from "./components/About";
import { Features } from "./components/Features";
import { BeachInfrastructure } from "./components/BeachInfrastructure";
import { Subscriptions } from "./components/Subscriptions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import styles from './Beach.module.css';

export const Beach = observer(() => {
  const { id } = useParams<{ id: string }>();
  const { beach } = beachStore;

  useEffect(() => {
    if (!id) return;
    beachStore.setBeach(id);
  }, [id]);

  if (!beach) return null;

  return (
    <>
      <Header name={beach.name} category={beach.category} />

      <Drawer
        header={<Navigation beach={beach} />}
        headerClassName={styles.header}
        drawerContent={
          <>
            <Contacts />
            <About />
            <Features items={[{ name: "Бесплатный Wi-Fi", icon: "wifi" }, { name: "Удобные кресла", icon: "chair" }, { name: "Безопасные зоны для детей", icon: "child" }]} />
            <BeachInfrastructure items={[{ name: "Бесплатный Wi-Fi", icon: "wifi" }, { name: "Удобные кресла", icon: "chair" }, { name: "Безопасные зоны для детей", icon: "child" }]} />
            <Subscriptions subscriptions={[{ title: "Абонемент 1", description: "Описание абонемента 1", price: "1000 ₽", duration: "1 месяц", features: ["Удобные кресла", "Безопасные зоны для детей"] }, { title: "Абонемент 2", description: "Описание абонемента 2", price: "1500 ₽", duration: "3 месяца", features: ["Бесплатный Wi-Fi", "Удобные кресла"] }]} />
          </>
        }
      />
    </>
  );
});
