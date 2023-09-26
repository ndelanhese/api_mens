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

export const getDateTime = (date: Date): string => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Sao_Paulo',
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return date.toLocaleString('pt-BR', options);
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

export const formatLocaleDateString = (
  dateInput?: Date | string | undefined | null,
  timeZone?: Intl.LocalesArgument,
): string | null => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  if (!dateInput) {
    return null;
  }

  if (typeof dateInput === 'string') {
    return new Date(dateInput).toLocaleString(timeZone ?? 'pt-BR', options);
  }

  const teste = new Date(dateInput).toLocaleString(
    timeZone ?? 'pt-BR',
    options,
  );
  return teste;
};

export default getDate;
