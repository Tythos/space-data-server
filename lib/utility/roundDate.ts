export function roundToUTCDate(date: Date): Date {
    date.setUTCHours(0, 0, 0, 0);
    return date;
}