const formatShortDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const formatFullDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};

const formatShortDateWithoutYear = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
    });
};

function formatTimeRange(startHour: Date, endHour: Date) {
    const options = { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' };

    const start = new Date(startHour).toLocaleTimeString('ru-RU', options);
    const end = new Date(endHour).toLocaleTimeString('ru-RU', options);

    return `${start} - ${end}`;
}

function getTimeRangeDuration(startHour: Date, endHour: Date) {
    const start = new Date(startHour);
    const end = new Date(endHour);

    return end.getTime() - start.getTime();
}

function getTimeRangeDurationInHours(startHour: Date, endHour: Date) {
    const duration = getTimeRangeDuration(startHour, endHour);

    return duration / (1000 * 60 * 60);
}

function getTimeRangeDurationInMinutes(startHour: Date, endHour: Date) {
    const duration = getTimeRangeDuration(startHour, endHour);

    return duration / (1000 * 60);
}

function getTimeRangeDurationInHoursAndMinutes(startHour: Date, endHour: Date) {
    const duration = getTimeRangeDuration(startHour, endHour);

    return {
        hours: Math.floor(duration / (1000 * 60 * 60)),
        minutes: Math.floor(duration / (1000 * 60) % 60),
    };
}

function declensionOfHours(number: number) {
    const cases = [2, 0, 1, 1, 1, 2];
    const titles = ['час', 'часа', 'часов'];
    return titles[
        (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]
    ];
}

function formatDateTime(date: Date, hours: number, startTime: string) {
    const pad = (num: number) => num.toString().padStart(2, '0');

    const [startHour, startMinute] = startTime.split(':').map(Number);

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());

    const fromDate = `${year}-${month}-${day} ${pad(startHour)}:${pad(startMinute)}:00`;

    const endDate = new Date(date);
    endDate.setHours(startHour + hours, startMinute);

    // Проверка на переход на следующий день
    const endYear = endDate.getFullYear();
    const endMonth = pad(endDate.getMonth() + 1);
    const endDay = pad(endDate.getDate());
    const endHour = pad(endDate.getHours());
    const endMinute = pad(endDate.getMinutes());

    const toDate = `${endYear}-${endMonth}-${endDay} ${endHour}:${endMinute}:00`;

    return { from_date: fromDate, to_date: toDate };
}

function calculateTimeDifferenceInHours(startTime: string, endTime: string): number {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0, 0);

    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0, 0);

    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

    return differenceInHours;
}

function convertToISO(date: Date) {
    date.setSeconds(0);
    date.setMilliseconds(0);

    // Форматирование в ISO строку с часами и минутами
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export {
    formatShortDate,
    formatFullDate,
    formatShortDateWithoutYear,
    formatTimeRange,
    getTimeRangeDuration,
    getTimeRangeDurationInHours,
    getTimeRangeDurationInMinutes,
    getTimeRangeDurationInHoursAndMinutes,
    declensionOfHours,
    formatDateTime,
    calculateTimeDifferenceInHours,
    convertToISO,
};