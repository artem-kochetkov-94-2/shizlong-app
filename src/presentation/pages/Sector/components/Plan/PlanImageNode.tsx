export const PlanImageNode = ({
    data: {
        linkPlan,
        sectorName,
    },
}: {
    data: {
        linkPlan: string,
        sectorName: string,
    },
}) => {
    return (
        <img
            src={linkPlan}
            alt={sectorName}
            // style={{
            //     width: getPlanSize(sector.sector_coords_pixel).width,
            //     height: getPlanSize(sector.sector_coords_pixel).height,
            // }}
        />
    );
};

