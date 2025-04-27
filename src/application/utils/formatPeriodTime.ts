export const formatPeriodTime = (time: string) => {
    return time.split(':').slice(0, 2).join(':');
};