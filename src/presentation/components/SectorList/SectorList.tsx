import { RawSector } from "@src/infrastructure/Locations/types";
import { SectorItem } from "../SectorItem";
import styles from "./SectorList.module.css";

interface SectorListProps {
    items: RawSector[];
}

export const SectorList = ({ items }: SectorListProps) => {
    return (
        <div className={styles.wrapper}>
            {items.map((item) => (
                <SectorItem key={item.id} data={item} />
            ))}
        </div>
    );
};
