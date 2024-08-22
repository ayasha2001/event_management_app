export const updateDateFormat = (date:string): string => {
    const newDate = new Date(date);
    const updatedDateFormat = newDate.toUTCString()
    return updatedDateFormat;
}

export const scrollToTop = ()=> {
    window.scrollTo({
        top: 0,
        behavior: 'smooth', // Smooth scroll
      });
}