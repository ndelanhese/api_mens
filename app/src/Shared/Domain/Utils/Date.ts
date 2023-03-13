const getDate = (date?: Date | string): Date => {
  if (!date) {
    return new Date();
  }
  if (typeof date === 'string') {
    return generateDateFromString(date);
  }
  return date;
};

export const generateDateFromString = (date: string) => {
  return new Date(date);
};

export const getDateString = (dateInput?: Date): string => {
  const date = dateInput || new Date();
  const dateString = date.toISOString().split('T')[0];
  return dateString;
};

export const getCurrentDateUS = (): string => {
  const date = getDate();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

export const getNextDay = (dateInput?: Date): Date => {
  const date = dateInput || new Date();
  date.setDate(date.getDate() + 1);
  return date;
};

export const getYear = (dateInput?: Date): number => {
  const date = dateInput || new Date();
  return date.getFullYear();
};

export const getMonth = (dateInput?: Date): number => {
  const date = dateInput || new Date();
  const month = date.getMonth() + 1;
  return Number(('0' + month).slice(-2));
};

export const getDay = (dateInput?: Date): number => {
  const date = dateInput || new Date();
  const day = date.getDate() + 1;
  return Number(('0' + day).slice(-2));
};

export const getTime = (dateInput?: Date): number => {
  const date = dateInput || new Date();
  return date.getTime();
};

export default getDate;
