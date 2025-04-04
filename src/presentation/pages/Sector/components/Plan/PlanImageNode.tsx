import { RawSector } from "@src/infrastructure/Locations/types";

// const getPlanSize = (coords: [number, number][]) => {
//     let minX = coords[0][0];
//     let maxX = coords[0][0];
//     let minY = coords[0][1];
//     let maxY = coords[0][1];

//     coords.forEach(([x, y]) => {
//         if (x < minX) minX = x;
//         if (x > maxX) maxX = x;
//         if (y < minY) minY = y;
//         if (y > maxY) maxY = y;
//     });

//     const width = maxX - minX;
//     const height = maxY - minY;

//     return { width, height };
// };

interface PlanImageNodeProps {
    data: {
        sector: RawSector,
    },
}

export const PlanImageNode = ({ data: { sector } }: PlanImageNodeProps) => {
    // const { width, height } = getPlanSize(sector.sector_coords_pixel);
    // console.log('sector', JSON.parse(JSON.stringify(sector)));
    // console.log('sectorWidth', width);
    // console.log('sectorHeight', height);

    return (
        <img
            src={sector.link_plan}
            alt={sector.name}
            // style={{
            //     width: width,
            //     height: height,
            // }}
        />
    );
};

