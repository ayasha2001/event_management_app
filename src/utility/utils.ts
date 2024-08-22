export const updateDateFormat = (date:string): string => {
    const newDate = new Date(date);
    const updatedDateFormat = newDate.toUTCString()
    return updatedDateFormat;
}