import { sectorStore } from "@src/application/store/sectorStore";
import { RawSector } from "@src/infrastructure/Locations/types";
import { useRef } from "react";

interface PlanImageNodeProps {
    data: {
        sector: RawSector,
    },
}

export const PlanImageNode = ({ data: { sector } }: PlanImageNodeProps) => {
    const imgRef = useRef<HTMLImageElement>(null);

    const handleImageLoad = () => {
        if (imgRef.current) {
            sectorStore.setSize({
                width: imgRef.current.width,
                height: imgRef.current.height,
            });
        }
    };

    return (
        <img
            ref={imgRef}
            src={sector.link_plan}
            alt={sector.name}
            onLoad={handleImageLoad}
        />
    );
};

