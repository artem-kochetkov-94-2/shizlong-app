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

export { formatShortDate, formatFullDate };