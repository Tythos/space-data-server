export function roundToUTCDate(date: Date): Date {
    // Set the time to midnight (00:00:00) in the local time zone
    date.setHours(0, 0, 0, 0);

    // Convert the date to the UTC time zone
    date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    return date;
}