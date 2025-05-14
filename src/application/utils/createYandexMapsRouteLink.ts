export const createYandexMapsRouteLink = (
    startCoords: [number, number],
    endCoords: [number, number],
    transportType = 'mt',
) => {
    const baseUrl = 'https://yandex.ru/maps/?rtext=';
    const route = `${startCoords[0]}%2C${startCoords[1]}~${endCoords[0]}%2C${endCoords[1]}`;
    return `${baseUrl}${route}&rtt=${transportType}`;
};

// export const createYandexMapsRouteLink = (
//     startCoords: [number, number],
//     endCoords: [number, number],
//     transportType: 'pedestrian' = 'pedestrian',
// ) => {
//     const baseUrl = 'https://2gis.ru/directions';
//     return `${baseUrl}/tab/${transportType}/points/${startCoords[0]}%2C${startCoords[1]}%3B${endCoords[0]}%2C${endCoords[1]}`;
// };
